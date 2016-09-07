# Unsplash API Overview

## User

### Current user
```bash
  GET /me
```

### Update the current user’s profile
```bash
  put /me
```

### Get a user’s public profile
```bash
 GET /users/:username
```

### Get a user’s portfolio link
```bash
 GET /users/:username/portfolio
```

### List a user’s photos
```bash
 GET /users/:username/photos
```

### List a user’s liked photos
```bash
 List a user’s liked photos
```

### List a user’s collections
```bash
 GET /users/:username/collections
```

## Photos

### List photos
```bash
 GET /photos
```

### List curated photos
```bash
 GET /photos/curated
```

### Get a photo
```bash
 GET /photos/:id
```

### Get a random photo
```bash
 GET /photos/random
```

### Get a photo’s stats
```bash
 GET /photos/:id/stats
```

### Get a photo’s download link
```bash
 GET /photos/:id/download
```

### Update a photo
```bash
 PUT /photos/:id
```

### Like a photo
```bash
 POST /photos/:id/like
```

### Unlike a photo
```bash
 DELETE /photos/:id/like
```

## Search

### Search photos
```bash
 GET /search/photos
```

### Search collections
```bash
 GET /search/collections
```

### Search users
```bash
 GET /search/users
```

## Collections

### List collections
```bash
 GET /collections
```

### List featured collections
```bash
 GET /collections/featured
```

### List curated collections
```bash
 GET /collections/curated
```

### Get a collection
```bash
 GET /collections/:id
 GET /collections/curated/:id
```

### Get a collection’s photos
```bash
 GET /collections/:id/photos
 GET /collections/curated/:id/photos
```

### List a collection’s related collections
```bash
 GET /collections/:id/related
```

### Create a new collection
```bash
 POST /collections
```

### Update an existing collection
```bash
 PUT /collections/:id
```

### Delete a collection
```bash
 DELETE /collections/:id
```

### Add a photo to a collection
```bash
 POST /collections/:collection_id/add
```

### Remove a photo from a collection
```bash
 DELETE /collections/:collection_id/remove
```

## STATS

### Get a list of counts for all of Unsplash.
```bash
 GET /stats/total
```
