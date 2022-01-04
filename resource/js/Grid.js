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
          color: '',
          occupied: false
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
    this.grid.forEach((row, index) => {
      let currentCell = row[colId];
      if (index < this.grid.length - 1) {
        let nextCell = this.grid[index + 1][colId];
        if (index === 0 && nextCell.occupied === true) {
          this.populateCell(currentCell, color);
        } else if (index < this.grid.length - 1 && index > 0) {
          let previousCell = this.grid[index - 1][colId];
          if (nextCell.occupied === true && previousCell.occupied === false) {
            this.populateCell(currentCell, color);
          }
        }
      } else if (currentCell.occupied === false) {
        this.populateCell(currentCell, color);
      }
    });
  }

  populateCell(cell, color) {
    cell.color = color;
    cell.occupied = true;
  }

  columnIsFull(colId) {
    return this.grid[0][colId].occupied;
  }
}