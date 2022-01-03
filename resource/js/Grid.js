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
        row.push((y * this.width) + x);
      }
      this.grid.push(row);
    }
  }

  render() {
    let $html = ``;
    this.grid.forEach((element, index) => {
      $html += `<tr id="${index}">`;
      element.forEach((element) => $html += `<td id="${element}"></td>`);
      $html += `</tr>`;
    });
    return $html;
  }
}