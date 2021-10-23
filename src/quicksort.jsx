export const quickSortAnimationLR = (array) => {
    const animations = [];
    const copy = [...array];
    quickSortLR(copy, 0, array.length-1, animations); //LR
    return animations;
}

export const quickSortAnimationLL = (array) => {
    const animations = [];
    const copy = [...array];
    quickSort(copy, 0, array.length-1, animations); //LL
    return animations;
}

const swap = (array, left, right, animations) => {
    const temp = array[left];
    animations.push([left, array[right]]);
    array[left] = array[right];
    animations.push([right, temp]);
    array[right] = temp;
}

const quickSortLR = (array, leftIndex, rightIndex, animations) => {
    let pivot = partitionLR(array, leftIndex, rightIndex, animations);
    let pivVal = array[pivot].height;
    let low = leftIndex;
    let high = rightIndex;

    while(low <= high)
    {
        while(array[low].height < pivVal)
        {
            low++;
        }

        while(array[high].height > pivVal)
        {
            high--;
        }

        if(low <= high)
        {
            swap(array, low, high, animations);
            if(pivot === low) { pivot = high; }
            else if(pivot === high) { pivot = low; }

            low++;
            high--;
        }
    }

    if(leftIndex < high) { quickSortLR(array, leftIndex, high, animations); }
    if(low < rightIndex) { quickSortLR(array, low, rightIndex, animations); }
}

const partitionLR = (array, leftIndex, rightIndex, animations) => {
    let pivot = Math.floor((leftIndex+rightIndex)/2);
    let l = leftIndex;
    let r = rightIndex;
    while(l <= r)
    {
        while(array[l].height < array[pivot].height)
        {
            l++;
        }
        while(array[r].height > array[pivot].height)
        {
            r--;
        }

        if(l <= r)
        {
            swap(array, l, r, animations);
            l++;
            r--;
        }
    }
    return l;
}

const partition = (array, leftIndex, rightIndex, animations) => {
    const pivVal = array[rightIndex].height;
    let pivInd = leftIndex;
    for(let i = leftIndex; i < rightIndex; i++)
    {
        if(array[i].height < pivVal)
        {
            swap(array, i, pivInd, animations);
            pivInd++;
        }
    }

    swap(array, pivInd, rightIndex, animations);
    return pivInd;
}

const quickSort = (array, leftIndex, rightIndex, animations) => {

    if(leftIndex >= rightIndex) { return; }
    let pivot = partition(array, leftIndex, rightIndex, animations);
    quickSort(array, leftIndex, pivot-1, animations);
    quickSort(array, pivot+1, rightIndex, animations);
}