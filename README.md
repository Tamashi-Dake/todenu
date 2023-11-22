# Project Name: Todenu

currently working on an Android project so this project is on hold atm

Project description:
- [ ] Home (Todenu workspace)
- [ ] Your Todenu (user's Todenu)
- [ ] Profile (user info, settings, statistics)
- [ ] About (project info, contact, etc)

Main Objective (development version):
- [ ] Rework on the UI 


Some features:  
- [x] Authentication with Google account(got Server error 500 on production)  
- [x] set time out for session (30 minutes, but i can't make alert work)
- [x] Drag and drop to add / change order of job  
- [x] CRUD custom menu (if logged in) 
- [ ] Deal with time input + Pomodoro timer
- [x] Todenu categories(tabs)
- [ ] Update bill with total job and price(time)  
- [ ] Checkout to start timecounter (sẽ xem xét cho từng job)  
- [ ] Random to randomize job within freetime (require fill freetime first)  
- [ ] Store job statistics for each user
- [ ] Responsive for small screen
- [ ] Remove all unused dependencies + refactor project structure
- [ ] Loading skeleton for each Todenu
- [ ] Optimize performance (Link, refactor client component)
- [x] Deploy to Vercel
- [ ] Add test (maybe?)

Flow:  
  - Guess:  
        - select, start sample job menu  
        - log in with Google account  
  - User:   
        - CRUD User menu  
        - Use their own menu  
        - Todenu statistics?  


I might fix these bugs later:
- [ ] Fixing Production problem (can't login with Google account)
- [ ] Bill bug: when draging to the bottom right, the element can go out of bound
- [ ] Bill bug: click event trigger drag event thus making user have to click multiple times to delete

