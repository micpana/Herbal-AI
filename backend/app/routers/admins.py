from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Admin, Product, UsageLog
from ..schemas import Admin, AdminBase, AdminLogin, Token, Product, ProductBase, UsageStat
from ..services.auth_service import verify_password, get_password_hash, create_access_token
from jose import jwt

router = APIRouter(prefix="/api/admins", tags=["admins"])

security = HTTPBearer()

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        admin = db.query(Admin).filter(Admin.username == username).first()
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login", response_model=Token)
def login(admin_login: AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == admin_login.username).first()
    if not admin or not verify_password(admin_login.password, admin.password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/", response_model=Admin)
def create_admin(admin: AdminBase, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    hashed_password = get_password_hash(admin.password)
    db_admin = Admin(**admin.dict(), password=hashed_password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@router.get("/", response_model=List[Admin])
def read_admins(current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    return db.query(Admin).all()

@router.put("/{admin_id}", response_model=Admin)
def update_admin(admin_id: int, admin: AdminBase, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if db_admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    for key, value in admin.dict().items():
        if key == "password":
            value = get_password_hash(value)
        setattr(db_admin, key, value)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@router.delete("/{admin_id}")
def delete_admin(admin_id: int, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if db_admin is None:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(db_admin)
    db.commit()
    return {"detail": "Admin deleted"}

@router.get("/products", response_model=List[Product])
def read_products(current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.post("/products", response_model=Product)
def create_product(product: ProductBase, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product: ProductBase, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"detail": "Product deleted"}

@router.get("/stats", response_model=UsageStat)
def get_stats(current_admin: Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    total_calls = db.query(UsageLog).count()
    total_tokens = sum(log.tokens_used for log in db.query(UsageLog).all())
    return {"total_calls": total_calls, "total_tokens": total_tokens}