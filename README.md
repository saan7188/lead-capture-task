# Lead Capture + Webhook Assignment

Hello,

This is my submission for the MERN / Automation Developer screening assignment.

I tried to build a simple lead capture page with form, list of leads, and webhook trigger.

## What I built

- Form with all fields they asked (Name*, Email*, Phone*, Company, Message, Source dropdown)
- Basic validation (required fields + phone should be numbers only)
- Leads saved in JSON Server (db.json) 
- Leads shown in table below form (auto refresh after submit)
- Added dark mode toggle (bonus)
- Added search box and source filter in table (bonus)
- Form clears after submit
- Webhook sent after save (with correct payload)

## Tech I used

- React + Vite
- Tailwind CSS (for style + dark mode)
- JSON Server (mock database)
- fetch (for save and load leads)
- webhook.site (for webhook test)

## How to run

1. In main folder run JSON Server:
   npx json-server db.json --port 3001 --watch --headers "{\"Access-Control-Allow-Origin\": \"*\"}"

   Keep this terminal open.

2. In frontend folder:
   cd frontend
   npm install (only first time)
   npm run dev

Open http://localhost:5173

## Webhook part

- After submit → lead saved in JSON Server
- Then webhook sent to webhook.site
- I used cors-anywhere proxy because direct fetch from browser gives CORS error.
- So i used cors-anywhere.com with my webhook unique id.
- Payload format is same as asked:
  {
    "name": "...",
    "email": "...",
    "source": "...",
    "created_at": "..."
  }
- If webhook fails → show error message (but lead is saved)

## Bonus I added

- Dark mode toggle (saved in browser)
- Search + filter in table

## What I learned

- How to use JSON Server
- CORS error and how to fix with proxy

Thanks for giving this assignment.  
I learned a lot.

Regards ,
Santhosh Kumar S .
