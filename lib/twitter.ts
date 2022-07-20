const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

export interface Tweet {
    id: string,
    createdAt: Date,
    text: string,
    user: {
        name: string,
        username: string,
        url: string,
        profilePic: string
    }
}
export const getTweets = async (): Promise<Tweet[]> => {
    const res = await client.get('search/tweets', { q: '#jqqtalks' });
    const formattedTweets = res.statuses.map((status: any) => ({
        id: status.id,
        createdAt: status.created_at,
        text: status.text,
        user: {
            name: status.user.name,
            username: status.user.screen_name,
            url: status.user.url,
            profilePic: status.user.profile_background_image_url
        }
    }))
    return formattedTweets;
}