const mergeAnimation = (array) => {
    const animations = [];
    const copy = [...array];
    mergesort(copy, 0, copy.length-1, animations);
    return animations;
}

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

    for(let i = 0; i < n1; ++i) { left[i] = array[leftIndex + i]; }
    for(let i = 0; i < n2; ++i) { right[i] = array[middle + 1 + i]; }

    //initial index of first, second and merged subarrays
    let s1 = 0; let s2 = 0; let merged = leftIndex;
    

    while(s1 < n1 && s2 < n2)
    {
        if(left[s1].height <= right[s2].height) { 
            animations.push([merged, left[s1]]);
            array[merged] = left[s1];  
            ++s1;  }
        else { 
            animations.push([merged, right[s2]]);
            array[merged] = right[s2]; 
            ++s2;  }
        ++merged;
    }

    while(s1 < n1)
    {
        animations.push([merged, left[s1]]);
        array[merged] = left[s1];
        ++s1;
        ++merged;
    }

    while(s2 < n2)
    {
        animations.push([merged, right[s2]]);
        array[merged] = right[s2];
        ++s2;
        ++merged;
    }
}

export default mergeAnimation;