# CYBER RISK TOOL 
I built this project to practice both and to create something actually useful at the same time.

## What is this?
This is an ISMS (Information Security Management System) risk dashboard.
It helps you track and assess cybersecurity risks by scoring them based on 
how likely they are to happen and how bad the damage would be if they did.

It's inspired by real frameworks used in the industry like ISO 27001!

## How it works
You add a risk by filling in:
- **Title** — what's the threat? (e.g. Phishing Attack)
- **Asset** — what's at risk? (e.g. Email Server)
- **Owner** — who's responsible for it? (e.g. IT Team)
- **Likelihood** — how likely is it to happen? (1–5)
- **Impact** — how bad would it be? (1–5)

The app multiplies Likelihood × Impact to get a risk score and assigns a level:

| Score | Level |
|-------|-------|
| 1–5 | Low |
| 6–8 | Medium |
| 9–15 | High |
| 16–25 | Critical |

The pie chart updates automatically so you can see your risk distribution at a glance. Your data is also saved in the browser so it's still there when you come back!

## What I learned
- React (useState, useEffect, useMemo)
- Tailwind CSS for styling
- Recharts for data visualization
- Git & GitHub for version control
- How risk scoring actually works in cybersecurity

## Built with
- React
- Tailwind CSS
- Recharts
- Lucide React
