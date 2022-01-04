export default class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.createGrid();
  }

  createGrid() {
    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        row.push({
          id: (y * this.width) + x,
          color: 'none'
        });
      }
      this.grid.push(row);
    }
  }

  render() {
    let $html = ``;
    this.grid.forEach((element, index) => {
      $html += `<tr id="${index}">`;
      element.forEach((element) => $html += `<td id="${element.id}"><img src="/image/placeholder.png"></td>`);
      $html += `</tr>`;
    });
    return $html;
  }

  placeMarker(colId, color) {
    this.grid.forEach((element, index) => {
      let currentElement = element[colId];
      if (index < this.grid.length - 1) {
        let nextElement = this.grid[index + 1][colId];
        if (nextElement.color !== 'none') {
          currentElement.color = color;
          return;
        }
      } else {
        if (currentElement.color === 'none') {
          currentElement.color = color;
          return;
        }
      }
    });
  }
}