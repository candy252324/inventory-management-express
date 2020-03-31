module.exports={
    list:'select * from goods',
    add:'INSERT INTO goods(id,name,price) VALUES(?,?,?)',
    update:'UPDATE goods SET name = ?,price = ? WHERE Id = ?',
    del:'DELETE FROM goods where Id = ?'
}