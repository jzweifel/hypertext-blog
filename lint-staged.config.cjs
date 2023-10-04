const config = {
    "*.ts,*.js": "prettier --write --list-different",
    "*.tsx,*.jsx": "prettier --write --list-different",
    "*.md": "prettier --write --list-different"
  };
  
  module.exports = config;
  