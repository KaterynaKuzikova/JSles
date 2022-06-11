let arr = [1,2,3,4,5,6,7];
function sumFromIndex(arr, index){
    if(index === 0){
        return arr[index];
    }else{
        return arr[index] + sumFromIndex(arr, --index); 
    }
}
console.log(sumFromIndex(arr, 5));