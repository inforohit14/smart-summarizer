"""
Real-Time News Sentiment Tracker

Description:
This script fetches real-time news headlines from RSS feeds (like Google News),
filters them based on user-defined keywords, performs sentiment analysis using
TextBlob, and visualizes the sentiment distribution using matplotlib.

Features:
- Real-time headline collection using RSS
- Keyword-based filtering
- Sentiment classification (Positive, Negative, Neutral)
- Bar chart visualization
- CSV export of analyzed results

Technologies Used:
- Python 3.9+
- feedparser
- textblob
- pandas
- matplotlib
"""

# Keyword-based Headline Filter

keywords = ['inflation', 'AI', 'economy']
filtered = [h for h in headlines if any(k.lower() in h.lower() for k in keywords)]

# Optional: Print the filtered results
for h in filtered:
    print(h)
