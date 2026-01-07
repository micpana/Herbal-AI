# Herbal-AI

**Herbal-AI** is a full-stack web application that provides personalized herbal recommendations using AI (LLMs powered by OpenAI's Python API). Users input their age, gender, allergies, health goals, symptoms, and preferences for herbal formats (fresh/dried herbs, capsules, supplements, etc.). The AI generates safe, evidence-informed suggestions based on a curated list of herbs and available products, with strong emphasis on safety, contraindications, and disclaimers.

## Features

- **Anonymous User Experience**  
  - No login required for normal users  
  - Input form for personal details and health goals  
  - AI-powered recommendations in JSON format with Markdown explanations  
  - Product and herb cards with pros/cons, usage instructions, and purchase links (where applicable)

- **Admin Panel**  
  - JWT-authenticated admin dashboard  
  - Manage products (CRUD)  
  - Manage other admin accounts  
  - View AI usage statistics (total calls, total tokens used)

- **AI Recommendations**  
  - Strict prompt engineering to ensure safe, structured JSON output  
  - Recommendations limited to provided herbs (JSON) and products (database)  
  - Fallback behavior: improvises herbs if `herbs.json` is empty; skips products if database is empty  
  - Warm, empathetic tone with clear disclaimers

- **Tech Stack**  
  - **Frontend**: React 18 + TypeScript + Tailwind CSS + React Router + Axios  
  - **Backend**: Python + FastAPI + SQLAlchemy + PostgreSQL + OpenAI API  
  - **Auth**: JWT for admins (no user auth)  
  - **Deployment**: Docker + docker-compose  
  - **Documentation**: Auto-generated Swagger at `/docs`

## Project Structure

```
herbal-ai/
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── config.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── users.py
│   │   │   └── admins.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── ai_service.py
│   │   │   └── auth_service.py
│   │   └── utils/
│   │       └── herbs_loader.py
│   ├── herbs.json
│   ├── herb-combinations.json
│   ├── seed.py
│   ├── requirements.txt
│   ├── .env
│   └── Dockerfile
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── components/
│   │   │   ├── UserForm.tsx
│   │   │   ├── RecommendationDisplay.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── HerbCard.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ProductManager.tsx
│   │   │   └── AdminManager.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Admin.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── styles/
│   │       └── tailwind.css
│   ├── public/
│   │   └── 
│   ├── index.html
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vite-env.d.ts
|   ├── .eslintrc.cjs
|   ├── .prettierrc
|   ├── postcss.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker & Docker Compose (recommended)
- Node.js 18+ & npm (for local frontend dev)
- Python 3.10+ & pip (for local backend dev)
- PostgreSQL (or use Docker)
- OpenAI API key

## Installation & Setup

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/micpana/herbal-ai.git
   cd herbal-ai
   ```

2. Create `.env` file in `backend/`:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@db:5432/herbalai
   OPENAI_API_KEY=sk-your-openai-key
   JWT_SECRET=your-very-long-secret-key
   ```

3. Start the stack:
   ```bash
   docker-compose up -d --build
   ```

4. Seed the database (only needed first time):
   ```bash
   docker-compose exec backend python seed.py
   ```

5. Access the app:
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin (username: `admin`, password: `adminpass`)
   - Swagger Docs: http://localhost:8000/docs

### Local Development (without Docker)

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env  # edit with your values
python seed.py
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Default Admin Credentials

- Username: `admin`
- Password: `adminpass`

Change these immediately in production!

## Usage

### Normal Users
1. Visit http://localhost:3000
2. Fill in age, allergies, gender, pregnancy status, medications, goals/symptoms
3. Select desired recommendation types (fresh herbs, capsules, etc.)
4. Submit → Receive personalized recommendations

### Admins
1. Visit http://localhost:3000/admin
2. Log in
3. Manage products, admins, and view usage stats

## Screenshots

The `screenshots/` folder contains system screenshots demonstrating the application in action, including user interface views and admin panel functionalities.

- 1.png to 15.png: Various screenshots of the app's features.

## Security Notes

- Normal users are **completely anonymous** (no tracking)
- Admins use JWT (stored in localStorage)
- Passwords are hashed with bcrypt
- Use strong `JWT_SECRET` and protect `.env`

## Customization

- **Add new herbs**: Edit `backend/herbs.json`
- **Add new products**: Use admin dashboard or SQL
- **Change AI model**: Modify `model="gpt-4o"` in `ai_service.py`
- **Styling**: Edit Tailwind classes in frontend components

## Deployment

- Use Docker Compose on a VPS (e.g., DigitalOcean, AWS EC2)
- Set up HTTPS with Nginx + Let’s Encrypt
- Use environment variables securely (not committed `.env`)
- Consider a reverse proxy for production

## License

MIT License

## Acknowledgments

- OpenAI for GPT models
- FastAPI team
- React + Tailwind community

## Support & Contact

If you have any questions, need help with setup, want to report a bug, or have feature suggestions for **Herbal-AI**, feel free to reach out!

- **Email**: michaelmudimbu@gmail.com  

I'm happy to help! 🌿

---

Built with ❤️ for herbal wellness and responsible AI usage.

Happy herbing! 🌿