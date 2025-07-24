import { IMobileNavbarItem } from '../model/mobileNavbar.model';
import TinderIcon from '@/shared/assets/images/Tinder/TinderIcon.svg';
import ExploreIcon from '@/shared/assets/images/Explore/ExploreIcon.svg';
import MatchesIcon from '@/shared/assets/images/Matches/MatchesIcon.svg';
import ChatsIcon from '@/shared/assets/images/Chats/ChatsIcon.svg';
import ProfileIcon from '@/shared/assets/images/Profile/ProfileIcon.svg';
import { PRIVATE_PAGES } from '@/app/routes/routes';

const TINDER_NAVBAR_LINK_ITEM: IMobileNavbarItem = {
    id: 1,
    name: 'tinder',
    href: '',
    icon: TinderIcon,
};

const EXPLORE_NAVBAR_LINK_ITEM: IMobileNavbarItem = {
    id: 2,
    name: 'explore',
    href: PRIVATE_PAGES.EXPLORE.path,
    icon: ExploreIcon,
};

const MATCHES_NAVBAR_LINK_ITEM: IMobileNavbarItem = {
    id: 3,
    name: 'matches',
    href: '',
    icon: MatchesIcon,
};

const CHATS_NAVBAR_LINK_ITEM: IMobileNavbarItem = {
    id: 4,
    name: 'chats',
    href: '',
    icon: ChatsIcon,
};

const PROFILE_NAVBAR_LINK_ITEM: IMobileNavbarItem = {
    id: 5,
    name: 'profile',
    href: '',
    icon: ProfileIcon,
};

export const MOBILE_NAVBAR_ITEMS_ARRAY: IMobileNavbarItem[] = [
    TINDER_NAVBAR_LINK_ITEM,
    EXPLORE_NAVBAR_LINK_ITEM,
    MATCHES_NAVBAR_LINK_ITEM,
    CHATS_NAVBAR_LINK_ITEM,
    PROFILE_NAVBAR_LINK_ITEM,
];
