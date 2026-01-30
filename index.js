const express = require('express');

const app = express();

// Security headers for dynamic analysis
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello CI/CD Pipeline');
});

app.get('/user', (req, res) => {
  const name = (req.query.name || 'Guest').replace(/[^a-zA-Z\s]/g, '');
  const safeName = name.trim() || 'Guest';
  res.send(`Hello ${safeName}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

module.exports = app;
