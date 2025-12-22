from app.database import engine, Base, SessionLocal
from app.models import Admin, Product
from app.services.auth_service import get_password_hash

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Seed admins
admin = Admin(
    name="Admin User",
    username="admin",
    email="admin@example.com",
    password=get_password_hash("adminpass")
)
db.add(admin)

# Seed products (realistic based on herbs)
products = [
    Product(
        name="Organic Ginger Root",
        images="",
        description="Fresh organic ginger for nausea relief.",
        type="Fresh Herb",
        ingredients="Ginger",
        age_range="0-100",
        genders="Male,Female,Other",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Chamomile Tea Bags",
        images="",
        description="Dried chamomile flowers for relaxation.",
        type="Dried Herb",
        ingredients="Chamomile",
        age_range="18-65",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Echinacea Capsules",
        images="",
        description="Herbal supplement for immune support.",
        type="Herbal Capsule",
        ingredients="Echinacea",
        age_range="12-80",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    # Add more as needed, e.g., 7 more for 10 total
    Product(
        name="Peppermint Essential Oil",
        images="",
        description="For digestive aid and headaches.",
        type="Herbal Supplement",
        ingredients="Peppermint",
        age_range="18-70",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Dandelion Root Tea",
        images="",
        description="For liver detox.",
        type="Dried Herb",
        ingredients="Dandelion",
        age_range="18-65",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Lemon Balm Tincture",
        images="",
        description="For anxiety relief.",
        type="Herbal Drug",
        ingredients="Lemon Balm",
        age_range="18-65",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Fenugreek Seeds",
        images="",
        description="For lactation support.",
        type="Dried Herb",
        ingredients="Fenugreek",
        age_range="18-50",
        genders="Female",
        pregnancy_friendly=False,
        product_url=""
    ),
    Product(
        name="Cranberry Capsules",
        images="",
        description="For UTI prevention.",
        type="Herbal Capsule",
        ingredients="Cranberry",
        age_range="18-70",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Garlic Supplements",
        images="",
        description="For immune and heart health.",
        type="Herbal Supplement",
        ingredients="Garlic",
        age_range="18-80",
        genders="Male,Female",
        pregnancy_friendly=True,
        product_url=""
    ),
    Product(
        name="Red Raspberry Leaf Tea",
        images="",
        description="For pregnancy support.",
        type="Dried Herb",
        ingredients="Red Raspberry Leaf",
        age_range="18-40",
        genders="Female",
        pregnancy_friendly=True,
        product_url=""
    )
]
db.add_all(products)

db.commit()
db.close()
print("Database seeded!")