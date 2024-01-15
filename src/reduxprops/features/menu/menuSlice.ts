import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LabelItem from "app/models/labelItem";
import { v4 as uuidv4 } from "uuid";
import { handleOpenEditConfirmModal } from "@slice/modal/modalSlice";
import { Note } from "app/models/note";
import {Label} from "app/models/Label";
interface SidebarItem {
  name: string;
  iconName: string;
  link: string;
  id: string;
}

type TagType = Label;

interface SidebarState {
  items: SidebarItem[];
  selectedItem: string;
  newLabelSpace: SidebarItem[];
  errorMessage: string | null;
  labelToDelete: string | null;
  labelToEdit: LabelItem | null;
  selectedMenu: string | null;
  mergeFlag: boolean;
  mergeToExisted: LabelItem | null;
  // existedLabel: string | null;
  existedLabel: LabelItem | null;
  labelDeleted: boolean;
  selectedLabelId: string | null;
  labelMemos: Note[];
  selectedMemoId: string | null;
  notes: Note[];
}

const initialState: SidebarState = {
  items: [
    {
      name: "메모",
      iconName: "lightbulb",
      link: "/",
      id: "memo",
    },
    {
      name: "알림",
      iconName: "notifications",
      link: "/pages/notification",
      id: "notification",
    },
    {
      name: "라벨 수정",
      iconName: "edit",
      link: "/pages/edit",
      id: "edit",
    },
    {
      name: "보관처리",
      iconName: "archive",
      link: "/pages/archiveProcessing",
      id: "archiveProcessing",
    },
    {
      name: "휴지통",
      iconName: "delete",
      link: "/pages/trashCan",
      id: "trashCan",
    },
  ],
  selectedItem: localStorage.getItem("selectedItemName") || "Keep",
  newLabelSpace: [],
  errorMessage: null,
  labelToDelete: null,
  labelToEdit: null,
  selectedMenu: "memo",
  mergeFlag: false,
  mergeToExisted: null,
  existedLabel: null,
  labelDeleted: false,
  selectedLabelId: null,
  labelMemos: [],
  selectedMemoId: null,
  notes: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setCreatedLabel: (state, action) => {
      const newLabelName = action.payload;
      if (state.newLabelSpace.some((label) => label.name === newLabelName)) {
        state.errorMessage = "이미 존재하는 이름입니다.";
        return;
      }
      state.errorMessage = null;
      const newLabel = {
        name: action.payload,
        iconName: "label",
        link: `/pages/label/${action.payload}`,
        id: `${uuidv4()}`,
      };
      state.items = [
        ...state.items.slice(0, 2),
        ...state.items.slice(2 + state.newLabelSpace.length),
      ];

      state.newLabelSpace = [...state.newLabelSpace, newLabel];

      const updatedLabels = [
        ...state.items.slice(0, 2),
        ...state.newLabelSpace.sort((a, b) => a.name.localeCompare(b.name)),
        ...state.items.slice(2),
      ];

      state.items = updatedLabels;
    },
    setLabelToDelete: (state, action) => {
      const labelId = action.payload;
      state.labelToDelete = labelId;
    },
    deleteLabel: (state, action) => {
      state.newLabelSpace = state.newLabelSpace.filter(
        (label) => label.name !== action.payload
      );
      state.items = state.items.filter((item) => item.name !== action.payload);

      const labelName = action.payload;
      if (window.location.href.includes(labelName)) {
        state.selectedMenu = "memo";
        window.history.pushState(null, "", "/");
      }
      state.labelDeleted = true;
    },
    setLabelToUpdate: (state, action) => {
      const label = action.payload;
      state.labelToEdit = label;
    },
    updateLabel: (state, action) => {
      const updatedLabel: SidebarItem = action.payload;
      const originalLabel = state.labelToEdit;
 // originalLabel이 null이 아닌지 확인
 if (originalLabel) {
  // 라벨 목록 업데이트
  state.newLabelSpace = state.newLabelSpace.map(label =>
    label.id === originalLabel.id ? updatedLabel : label
  );

  // 메모의 라벨 정보 업데이트
  state.notes.forEach(note => {
    if(note.tags){
    note.tags = note.tags.map(tag => {
      if (tag.id === originalLabel.id) {
        return {
          ...tag,
          id: updatedLabel.id,   // 라벨 ID 업데이트
          name: updatedLabel.name // 라벨 이름 업데이트
        };
      } else {
        return tag;
      }
    })}
  });
}
      // const existingLabel = state.newLabelSpace.find(
      //   (label) =>
      //     label.name === updatedLabel.name && label.id !== originalLabel?.id
      // );
      // state.newLabelSpace = state.newLabelSpace
      //   .map((label) => {
      //     return label.name === originalLabel!.name ? updatedLabel : label;
      //   })
      //   .sort((a, b) => a.name.localeCompare(b.name));

      // const updatedLabels = [
      //   ...state.items.slice(0, 2),
      //   ...state.newLabelSpace,
      //   ...state.items.slice(2 + state.newLabelSpace.length),
      // ];

      // state.items = updatedLabels;

      // state.notes.forEach(note => {
      //   if (note.tags) {
      //     note.tags.forEach(tag => {
      //       if (originalLabel) {
      //       if (tag.id === originalLabel.id) {
      //         tag.name = updatedLabel.name; // 라벨 이름 업데이트
      //       }
      //     }
      //     });
      //   }
      // });
    },
    setMergeToExistedLabel: (state, action) => {
      state.mergeToExisted = action.payload;
    },
    setExistedLabel: (state, action) => {
      state.existedLabel = action.payload;
    },
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
    resetLabelDeleted: (state) => {
      state.labelDeleted = false;
    },
    setMergeFlag: (state, action) => {
      state.mergeFlag = action.payload;
    },
    setSelectedLabelId: (state, action: PayloadAction<string | null>) => {
      state.selectedLabelId = action.payload;
    },
    setLabelMemos: (state, action: PayloadAction<Note[]>) => {
      state.labelMemos = action.payload;
    },
    setSelectedMemoId: (state, action: PayloadAction<string | null>) => {
      state.selectedMemoId = action.payload;
    },
    mergeLabels: (state, action) => {
      const { fromLabel, toLabel } = action.payload;
      state.notes.forEach((note) => {
        if (note.tags) {
          note.tags.forEach((tag) => {
            if (tag.name === fromLabel) {
              tag.name = toLabel; // 라벨 이름 변경
            }
          });
        }
      });
      if (state.selectedLabelId === fromLabel.id) {
        state.selectedLabelId = toLabel.id;
      }
    },
}});

export const {
  setSelectedItem,
  setCreatedLabel,
  deleteLabel,
  updateLabel,
  setLabelToDelete,
  setLabelToUpdate,
  setMergeToExistedLabel,
  setExistedLabel,
  setSelectedMenu,
  resetLabelDeleted,
  setMergeFlag,
  setSelectedLabelId,
  setLabelMemos,
  setSelectedMemoId,
  mergeLabels
} = menuSlice.actions;

export default menuSlice.reducer;
