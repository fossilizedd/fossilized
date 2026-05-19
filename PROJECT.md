TODO
- Determine best lightweight backend
- Determine best data storage mechanism
- Break execution into phases
- Data extraction from Atlassian MCP
- Connect and setup a Google docs MCP

# Project 

## Goal
- Create a webapp and lightweight server that tracks

## Features
- Calendar to track things like festivals, produce thats in season, picking seasons for produce
- AI Agent process to search and update events
- Reuseable Tier list display component
- Read only unless otherwise stated

## Code Structure
- Places all code files under folder @src
- place all frontend related code under subfolder @client
- place all server related code under subfolder @server

### Frontend
- Use React 19
- Use Jotai
- Use style and food graphics like Makoto Shinkai movies

### Backend
- Use next.js

# Execution 

## Phase 1 Project scaffold
1. Lookup and use best practices for next.js
2. Create a folder structure appropriate for next.js 
3. create the package.json etc.
4. Create examples in each folder, but keep it minimal

## Phase 2 Calendar
1. Research produce that is available in the american midwest
2. Find the seasons where the produce is fresh and correct season
3. Extra research and emphasis on produce used in chinese, korean and japanese cooking
4. Include the picking season for fruits
5. Display this on the calendar in a UX friendly way using best practices
6. write the data to a file where it can be queried and served by the api
7. Create a graphic in Makoto Shinkai style animation as the header
8. Remove the example scaffolding that exists
9. Include detailed data about the produce

### Phase 2A
1. Perform Phase 2 but for fish from the great lakes
