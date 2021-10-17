//Takes in array to sort
//return list of instructions as to how to sort the array, which can be delayed to create animations
export const mergeAnimation = (array) => {
    const animations = [];
    mergesort(array, 0, array.length-1, animations);
    return animations;
}

//https://github.com/lexesjan/react-sort-visualizer/blob/master/src/algorithms/MergeSort.js
const mergesort = (array, leftIndex, rightIndex, animations) =>
{
    if(rightIndex > leftIndex)
    {
        let middle = leftIndex + Math.floor((rightIndex - leftIndex)/2);
        mergesort(array, leftIndex, middle, animations);
        mergesort(array, middle+1, rightIndex, animations);
        merge(array, leftIndex, middle, rightIndex, animations);
    }
}

const merge = (array, leftIndex, middle, rightIndex, animations) =>
{
    let n1 = middle - leftIndex + 1;
    let n2 = rightIndex - middle;

    //subarrays
    let left = new Array(n1);
    let right = new Array(n2);

    //left.push(array[leftIndex + i]);
    //right.push(array[middle + 1 + i]);
    for(let i = 0; i < n1; ++i) { left[i] = array[leftIndex + i]; }
    for(let i = 0; i < n2; ++i) { right[i] = array[middle + 1 + i]; }

    //initial index of first, second and merged subarrays
    let s1 = 0; let s2 = 0; let merged = leftIndex;
    

    while(s1 < n1 && s2 < n2)
    {
        if(left[s1].height <= right[s2].height) { array[merged] = left[s1]; ++s1; animations.push([array[merged].id, left[s1].id]); }
        else { array[merged] = right[s2]; ++s2; animations.push([array[merged].id, right[s2].id]); }
        ++merged;
    }

    while(s1 < n1)
    {
        array[merged] = left[s1];
        animations.push([array[merged].id, left[s1].id]);
        ++s1;
        ++merged;
    }

    while(s2 < n2)
    {
        array[merged] = right[s2];
        animations.push([array[merged].id, right[s2].id]);
        ++s2;
        ++merged;
    }
}