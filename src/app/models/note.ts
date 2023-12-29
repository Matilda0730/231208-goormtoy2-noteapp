import BackgroundColor from "./backgroundColor";
import { Tag } from "./tag";

export interface Note {
	title: string;
	text: string;
	tags: Tag[] | null;
	backgroundColor: string;
	isPinned: boolean;
	isRead: boolean;
	createdTime: number;
	editedTime: number | null;
	id: string;
}

export interface NotesState {
	notes: Note[];
}
