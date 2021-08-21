import { PostInterface } from '../PostInteface';

export default interface PostDispatcherInterface {
    posts: PostInterface[];
    loading: boolean;
    error: null | string;
}