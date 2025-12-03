const min = 10001; 
const max = 99999;
function generateQid() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports={generateQid}

