import BackgroundColor from "./backgroundColor";
import { Label } from "./Label";

export interface Note {
	title: string;
	text: string;
	tags: Label[] | null;
	backgroundColor: string;
	isPinned: boolean;
	isRead: boolean;
	createdTime: number;
	editedTime: number | null;
	id: string;
}

export interface NotesState {
	notes: Note[];
	trashCan: Note[];
	archiveList: Note[];
}
