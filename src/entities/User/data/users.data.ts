import { IUser } from '../model/user.model';

export const USERS_DATA_ARRAY: IUser[] = [
    {
        id: 1,
        name: 'Bruce Wayne',
        age: '28',
        photoUrl:
            'https://image.film.at/images/cfs_landscape_1232w_693h/4737309/christian-bale-as-bruce-wayne.jpg',
        isVerified: true,
        liked: false,
        disliked: false,
        superLiked: false,
        passions: ['Harry Potter', `’90s kid`, 'Travel'],
    },
    {
        id: 2,
        name: 'Felicia Hardy',
        age: '20',
        photoUrl: 'https://cdn.marvel.com/content/1x/_blackcat_card.jpg',
        isVerified: true,
        liked: false,
        disliked: false,
        superLiked: false,
        passions: ['Gym', 'Skincare', 'Music'],
    },
    {
        id: 3,
        name: 'Mary Jane Watson',
        age: '20',
        photoUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/45/453869/3172603-90ff4c9.jpg',
        isVerified: false,
        liked: false,
        disliked: false,
        superLiked: false,
        passions: ['Sushi', 'Travel', 'Instagram'],
    },
    {
        id: 4,
        name: 'Elena Belova',
        age: '27',
        photoUrl:
            'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8e/Yelena_Belova_Infobox.jpg',
        isVerified: false,
        liked: false,
        disliked: false,
        superLiked: false,
        passions: ['Hot yoga', 'Spa', 'Meditation'],
    },
];
