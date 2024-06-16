# auto-summary-drive
auto-summary-drive is a tool for automatically summarizing PDF. This repository includes instructions on how to use the tool, installation steps, and feature descriptions.

## Overview

auto-summary-drive is a tool designed to automatically summarize lengthy documents and extract key points using natural language processing techniques.

## Features

- Renames and relocates PDFs placed in Google Drive
- Summarizes PDFs
- Sends notifications via Slack
## Installation

### Prerequisites
- Access to Google Drive
- OPEN AI API Key
- Slack WebHook URL

### Setup

Follow these steps to set up auto-summary-drive:

1. **Copy the Google Spreadsheet**:
   - Copy the Google Spreadsheet from [this link](https://docs.google.com/spreadsheets/d/1IKS53gtvptm-iNmW2aD322U3LvDXCMLMCNBr0plV5c8/edit?usp=drive_link) and place it in your Google Drive.

2. **Fill in the SettingSheet**:
   - Open the copied Google Spreadsheet and navigate to the `Settings`.
   - Fill in the required settings, such as API keys and folder paths.

3. **Deploy Scripts using clasp**:
   - Install [clasp](https://github.com/google/clasp) by running:
     ```bash
     npm install -g @google/clasp
     ```
   - Authenticate clasp with your Google account:
     ```bash
     clasp login
     ```
   - Clone the repository and navigate to the script directory:
     ```bash
     git clone https://github.com/username/auto-summary-drive.git
     cd auto-summary-drive/scripts
     ```
   - Create a new Google Apps Script project and deploy it to the copied Spreadsheet:
     ```bash
     clasp create --type sheets --title "auto-summary-drive Script" --parentId <YOUR_SPREADSHEET_ID>
     clasp push
     ```

4. **Place PDFs in the Specified Folder**:
   - Place the PDFs you want to summarize in the folder specified in the `Settings`.

5. **Summary, Rename, and Slack Notification**:
   - The script will automatically summarize and rename the PDFs, then send a notification to Slack with the summary.

Make sure you have all the necessary permissions and API keys configured correctly in the `Settings` to ensure the smooth operation of the tool.
