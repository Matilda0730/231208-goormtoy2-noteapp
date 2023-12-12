import BackgroundColor from "./BackgroundColor";
import { Tag } from "./tag";

interface Note {
	title: string;
	content: string;
	tags: Tag[];
	backgroundcolor: BackgroundColor;
	priority: string;
	isPinned: boolean;
	isRead: boolean;
	date: string;
	createdTime: number;
	editedTime: null | number;
	id: string;
}
