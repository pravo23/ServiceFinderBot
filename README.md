# ServiceFinder Bot

**ServiceFinder Bot** helps you find and add service providers like electricians and plumbers through Telegram.

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your Telegram bot token:**

    Create a `.env` file with the following content:

    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    ```

4. **Run the bot:**

    ```bash
    node app.js
    ```

## Commands

- **/start**: Get bot description and available commands.
- **/add <service> <name> with <phone> in <city>**: Add a service provider.
- **/find <service> in <city>**: Find service providers.