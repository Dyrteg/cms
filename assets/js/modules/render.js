"use strict";


import { data } from "../script.js";
import { createItemRow } from "./addEl.js";
let itemsPage = 1;
let itemsView = 10;
let leftButton = document.querySelector('.left-btn');
let rightButton = document.querySelector('.right-btn');
const itemList = document.querySelector(".tbody");
const removeItems = (elem) => {
	const items = document.querySelectorAll(elem);
	for (let i = 0; i < items.length; i++) {
		items[i].remove();
	}
}
const renderItems = () => {
	// data.forEach(item => {
	// 	itemList.append(createItemRow(item));
	// });

	// for (let i = itemsPage * itemsView; i < data.length; i++) {
	// 	// itemList.append(createItemRow(data[i]));
	// 	// console.log(i)
	// 	// console.log(data);

	// 	// if (((itemsPage + 1) * itemsView) < data.length) {
	// 	// 	itemList.append(createItemRow(data[i]));
	// 	// } else {
	// 	// 	for (let j = itemsView; j < data.length; j++) {
	// 	// 		itemList.append(createItemRow(data[j]));
	// 	// 	}
	// 	// }
	// }

	rightButton.addEventListener('click', () => {
		removeItems('tbody .item');
		itemsPage += 1;
		for (let i = 0; i < itemsView; i++) {
			if (data[itemsPage * itemsView]) {
				itemList.append(createItemRow(data[i]));
			} else {
				if (data[itemsView + 1]) {
					itemList.append(createItemRow(data[itemsView + i]));
				}
			}
		}
	});
	
	leftButton.addEventListener('click', () => {
		if (!itemsPage <= 1) {
			removeItems('tbody .item');
			itemsPage -= 1;
			for (let i = 0; i < itemsView; i++) {
				if (data[itemsPage * itemsView]) {
					itemList.append(createItemRow(data[i]));
				} else {
					if (data[itemsView + 1]) {
						itemList.append(createItemRow(data[itemsView + i]));
					}
				}
			}
		}
	});

	for (let i = 0; i < itemsView; i++) {
		if (data[itemsPage * itemsView]) {
			itemList.append(createItemRow(data[i]));
		} else {
			if (data[itemsView + 1]) {
				itemList.append(createItemRow(data[itemsView + i]));
			}
		}
	}
};

export {renderItems};