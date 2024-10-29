<script>
    import { heap, animationWorking, codeColor, naturalLang, 
             animationSpeed, isPaused, elementCnt, animationCnt, 
             isBegin, isEnd, insertAnimationWorking, insertElement, createAnimationWorking,
             extractAnimationWorking, extractCnt, deletetAnimationWorking, deleteIdx, 
             tmpCreateHeap} from '../../lib/store';
    import { onMount, tick } from 'svelte';

    let graphTop = [];
    let graphLeft = [];
    let indexTop = [];
    let indexLeft = [];
    let initialGraphTop = [];
    let initialGraphLeft = [];
    let animationSteps = [];
    let isIndexVisible = Array(32).fill(true);

    onMount(async () => {
        $elementCnt = 31;

        $heap[0] = null;
        for (let i = 1; i <= $elementCnt; i++) {
            $heap[i] = 0;
        }

        // node, index 위치 초기화
        let topDiff = 60;
        let initialLeftDiff = 300;

        graphTop[1] = 70;
        graphLeft[1] = 750;

        for (let i = 1; i <= 15; i++) {
            let level = Math.floor(Math.log2(i)) + 1; // 레벨은 1부터 시작
            let leftDiff = initialLeftDiff / Math.pow(2, level - 1);

            // 왼쪽 자식 노드
            graphTop[i * 2] = graphTop[i] + topDiff;
            graphLeft[i * 2] = graphLeft[i] - leftDiff;

            // 오른쪽 자식 노드
            graphTop[i * 2 + 1] = graphTop[i] + topDiff;
            graphLeft[i * 2 + 1] = graphLeft[i] + leftDiff;
        }

        // 고정된 좌표 배열에 그래프의 초기 좌표 저장
        initialGraphTop = [...graphTop];
        initialGraphLeft = [...graphLeft];

        // 투명 index 이용해서 항상 index 위치 고정
        for (let i = 1; i <= 31; i++) {
            await tick(); 
            let element = document.querySelector(`.transparent-idx-${i}`);
            let rect = element.getBoundingClientRect();

            indexTop[i] = rect.top;
            indexLeft[i] = rect.left; 
        }

        // 랜덤 힙 구성
        $elementCnt = Math.floor(Math.random() * 31) + 1;
        $heap[1] = Math.floor(Math.random() * 31) + 40;

        for (let i = 2; i <= 31; i++) {
            if (i > $elementCnt) {
                $heap[i] = null;
            } else {
                let minRange = Math.floor($heap[Math.floor(i / 2)] * 0.67); 
                $heap[i] = minRange + Math.floor(Math.random() * ($heap[Math.floor(i / 2)] * 0.33)); 
            }
        }
     });

    $: if ($animationWorking) {
        if($insertAnimationWorking) {
            preDrawInsert();
            draw();
        }
        else if($extractAnimationWorking) {
            preDrawExtract();
            draw();
        }
        else if($deletetAnimationWorking) {
            preDrawDelete();
            draw();
        }
        else if($createAnimationWorking) {
            preDrawCreate();
            draw();
        }
    }

    const delay = (duration) => {
        return new Promise((resolve) => { setTimeout(resolve, duration); });
    };

    const waitPause = async () => {
        return new Promise((resolve) => {
            const checkPause = () => {
                if ($isPaused === false) {
                    setTimeout(resolve, 0);
                } 
                else {
                    setTimeout(() => {
                        if ($isPaused === true) {
                            checkPause(); 
                        } 
                        else {
                            resolve();
                        }
                    }, 50); 
                }
            };

            checkPause();
        });
    };

    const pushAnimationSteps = (tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 
                                tmpSwap1, tmpSwap2, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex) => {
            animationSteps.push({
            curHeap: [...tmpHeap],
            curFontColor: [...tmpFontColor],
            curNodeColor: [...tmpNodeColor],
            curBorderColor: [...tmpBorderColor],
            curSwap1: tmpSwap1,
            curSwap2: tmpSwap2,
            curNatural: tmpNatural,
            curBlack: tmpBlack,
            curCnt: tmpCnt,
            curInvisibleIndex: tmpInvisibleIndex,
        })
    };


    const preDrawInsert = () => {
        animationSteps = [];
        let tmpHeap = [...$heap];
        let tmpFontColor = Array(32).fill("#000000");
        let tmpNodeColor = Array(32).fill("#F2F2F2");
        let tmpBorderColor = Array(32).fill("#000000");
        let tmpNatural = "";
        let tmpBlack = 20; // 20 -> NONE
        let tmpCnt = $elementCnt;
        let tmpInvisibleIndex = 0;

        // 1. 초기 힙
        tmpNatural = "The current Binary Max Heap";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 2. 힙의 맨 끝에 원소 삽입
        tmpHeap[++tmpCnt] = $insertElement;
        tmpFontColor[tmpCnt] = "#F2F2F2";
        tmpNodeColor[tmpCnt] = "#FF8A27";
        tmpBorderColor[tmpCnt] = "#FF8A27";
        tmpNatural = `${$insertElement} is inserted at the back of compact array A.`;
        tmpBlack = 0;
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 3. 바꿀 경로에 있는 노드의 테두리, 폰트 색깔 변경 
        let changeNode = []
        let pathHeap = [...tmpHeap]; // 경로 체크를 위한 임시 힙
        let curNode = tmpCnt;
        let nxtNode = Math.floor(curNode / 2);

        while(curNode >= 2 && (pathHeap[curNode] > pathHeap[nxtNode])) {
            // 바꿀 경로에 있는 노드 색깔 변경 {border: crimson, font: crimson, node: crimson}
            tmpBorderColor[nxtNode] = "#D9513C";
            tmpFontColor[nxtNode] = "#D9513C";
            changeNode.push(nxtNode);

            [pathHeap[curNode], pathHeap[nxtNode]] = [pathHeap[nxtNode], pathHeap[curNode]];

            curNode = nxtNode;
            nxtNode = Math.floor(curNode / 2);
        }
  
        if(changeNode.length > 0) {
            tmpBlack = 20;
            tmpNatural = `Invalid nodes are shown in red.`;
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    
        }

        // 힙이 완성될때까지 swap
        let swappedNode = 0;
        curNode = tmpCnt;
        nxtNode = Math.floor(curNode / 2);  
        
        while(curNode >= 2 && (tmpHeap[curNode] > tmpHeap[nxtNode])) {
            // 4. swap할 노드의 테두리, 폰트 변경 + swap 완료한 노드의 테두리, 폰트 변경
            tmpBlack = 1;
            tmpNatural = `${tmpHeap[curNode]} > ${tmpHeap[nxtNode]}, so swap them.`;
            // 현재 노드 주황색 {border: orange, font: white, node: orange}
            tmpBorderColor[curNode] = "#FF8A27";
            tmpFontColor[curNode] = "#F2F2F2";
            tmpNodeColor[curNode] = "#FF8A27";
            // swap 할 노드 주황색 {border: orange, font: orange, node: white}
            tmpBorderColor[nxtNode] = "#FF8A27";
            tmpFontColor[nxtNode] = "#FF8A27";
            tmpNodeColor[nxtNode] = "#F2F2F2";
            // swap 한 노드 검은색 {border: black, font: black, node: white}
            tmpBorderColor[swappedNode] = "#000000";
            tmpFontColor[swappedNode] = "#000000";
            tmpNodeColor[swappedNode] = "#F2F2F2";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

            // 5. 스왑 완료
            tmpBlack = 2;
            tmpNatural = `${tmpHeap[curNode]} <-> ${tmpHeap[nxtNode]} have been swapped.`;
            [tmpHeap[curNode], tmpHeap[nxtNode]] = [tmpHeap[nxtNode], tmpHeap[curNode]];
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, curNode, nxtNode, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            swappedNode = curNode;
            curNode = nxtNode;
            nxtNode = Math.floor(curNode / 2);  
        }

        // 6. 힙 완성
        tmpBlack = 20;
        tmpNatural = `${$insertElement} has been inserted successfully.`;
        tmpFontColor = Array(32).fill("#000000");
        tmpNodeColor = Array(32).fill("#F2F2F2");
        tmpBorderColor = Array(32).fill("#000000");
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);
    };

    const preDrawExtract = () => {
        animationSteps = [];
        let tmpHeap = [...$heap];
        let tmpFontColor = Array(32).fill("#000000");
        let tmpNodeColor = Array(32).fill("#F2F2F2");
        let tmpBorderColor = Array(32).fill("#000000");
        let tmpNatural = "";
        let tmpBlack = 20; // 20 -> NONE
        let tmpInvisibleIndex = 0;
        let tmpCnt = $elementCnt;

        for(let cnt = 0; cnt < $extractCnt; cnt++) {
            // 1. 초기 힙
            tmpNatural = "Root stores the max item.";
            tmpBorderColor[1] = "#FF8A27";
            tmpFontColor[1] = "#F2F2F2";
            tmpNodeColor[1] = "#FF8A27";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);   

            // 2. 루트 노드 삭제
            let retValue = tmpHeap[1];
            tmpNatural = `Take out the root ${tmpHeap[1]}.`;
            tmpBlack = 0;
            //  루트 노드 투명하게 변경 {border: transparent, font: transparent, node: transparent}
            tmpBorderColor[1] = "rgba(255, 255, 255, 0)";
            tmpFontColor[1] = "rgba(255, 255, 255, 0)";
            tmpNodeColor[1] = "rgba(255, 255, 255, 0)";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            // 3. 맨 뒤 노드 선택
            tmpNatural = `Replace root with the last leaf ${tmpHeap[tmpCnt]}.`;
            tmpBlack = 1;
            // 맨 뒤 노드 색깔 변경 {border: orange, font: white, node: orange}
            tmpBorderColor[tmpCnt] = "#FF8A27";
            tmpFontColor[tmpCnt] = "#F2F2F2";
            tmpNodeColor[tmpCnt] = "#FF8A27";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            // 4. 맨 뒤 노드 루트 노드로 이동
            tmpNatural = "The new root.";
            tmpBlack = 1;
            tmpHeap[1] = tmpHeap[tmpCnt];
            tmpInvisibleIndex = tmpCnt;
            tmpHeap[tmpCnt--] = null;
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, tmpCnt + 1, 1, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            // 5. 바꿀 경로에 있는 노드의 색깔 변경 
            // 루트 노드 색깔 변경 {border: orange, font: white, node: orange} <- 이전에 투명색이었음
            tmpBorderColor[1] = "#FF8A27";
            tmpFontColor[1] = "#F2F2F2";
            tmpNodeColor[1] = "#FF8A27";    
            let changeNode = []
            let pathHeap = [...tmpHeap]; // 경로 체크를 위한 임시 힙
            let curNode = 1, nxtNode;

            while(curNode * 2 < tmpCnt) {
                if(pathHeap[curNode * 2 + 1] === null) {
                    nxtNode = pathHeap[curNode * 2] > pathHeap[curNode] ? curNode * 2 : -1;
                }
                else {
                    nxtNode = pathHeap[curNode * 2] > pathHeap[curNode * 2 + 1] ? curNode * 2 : curNode * 2 + 1;
                    nxtNode = pathHeap[curNode] > pathHeap[nxtNode] ? -1 : nxtNode;
                }

                if(nxtNode === -1) {
                    break;
                }

                // 바꿀 경로에 있는 노드 색깔 변경 {border: crimson, font: crimson, node: crimson}
                tmpBorderColor[nxtNode] = "#D9513C";
                tmpFontColor[nxtNode] = "#D9513C";
                changeNode.push(nxtNode);

                [pathHeap[curNode], pathHeap[nxtNode]] = [pathHeap[nxtNode], pathHeap[curNode]];

                curNode = nxtNode;
            }
    
            if(changeNode.length > 0) {
                tmpBlack = 20;
                tmpNatural = `Invalid nodes are shown in red.`;
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    
            }

            // 힙이 완성될때까지 swap
            let swappedNode = 0;
            curNode = 1;
            
            while(curNode * 2 < tmpCnt) {
                if(tmpHeap[curNode * 2 + 1] === null) {
                    nxtNode = tmpHeap[curNode * 2] > tmpHeap[curNode] ? curNode * 2 : -1;
                }
                else {
                    nxtNode = tmpHeap[curNode * 2] > tmpHeap[curNode * 2 + 1] ? curNode * 2 : curNode * 2 + 1;
                    nxtNode = tmpHeap[curNode] > tmpHeap[nxtNode] ? -1 : nxtNode;
                }

                if(nxtNode === -1) {
                    break;
                }

                // 6. swap할 노드의 테두리, 폰트 변경 + swap 완료한 노드의 테두리, 폰트 변경
                tmpBlack = 2;
                tmpNatural = `${tmpHeap[nxtNode]} > ${tmpHeap[curNode]}, so swap them.`;
                // 현재 노드 주황색 {border: orange, font: white, node: orange}
                tmpBorderColor[curNode] = "#FF8A27";
                tmpFontColor[curNode] = "#F2F2F2";
                tmpNodeColor[curNode] = "#FF8A27";
                // swap 할 노드 주황색 {border: orange, font: orange, node: white}
                tmpBorderColor[nxtNode] = "#FF8A27";
                tmpFontColor[nxtNode] = "#FF8A27";
                tmpNodeColor[nxtNode] = "#F2F2F2";
                // swap 한 노드 검은색 {border: black, font: black, node: white}
                tmpBorderColor[swappedNode] = "#000000";
                tmpFontColor[swappedNode] = "#000000";
                tmpNodeColor[swappedNode] = "#F2F2F2";
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

                // 7. 스왑 완료
                tmpBlack = 3;
                tmpNatural = `${tmpHeap[curNode]} <-> ${tmpHeap[nxtNode]} have been swapped.`;
                [tmpHeap[curNode], tmpHeap[nxtNode]] = [tmpHeap[nxtNode], tmpHeap[curNode]];
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, curNode, nxtNode, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

                swappedNode = curNode;
                curNode = nxtNode;
            }

            // 8. 힙 완성
            tmpBlack = 20;
            tmpNatural = `ExtractMax() has been completed.<br/>We return the max item: ${retValue}.`;
            tmpFontColor = Array(32).fill("#000000");
            tmpNodeColor = Array(32).fill("#F2F2F2");
            tmpBorderColor = Array(32).fill("#000000");
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);
        }
    }

    const preDrawDelete = () => {
        animationSteps = [];
        let tmpHeap = [...$heap];
        let tmpFontColor = Array(32).fill("#000000");
        let tmpNodeColor = Array(32).fill("#F2F2F2");
        let tmpBorderColor = Array(32).fill("#000000");
        let tmpNatural = "";
        let tmpBlack = 20; // 20 -> NONE
        let tmpInvisibleIndex = 0;
        let tmpCnt = $elementCnt;

        // 1. 초기 힙
        tmpNatural = "The current Binary Max Heap";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 2. 삭제할 노드 root + 1로 값 변경 후 선택
        tmpBlack = 0;
        tmpNatural = `index ${$deleteIdx}'s value is updated to be the new max(the value of the previous root+1)`;
        // 삭제할 노드 주황색 {border: orange, font: white, node: orange}
        tmpHeap[$deleteIdx] = tmpHeap[1] + 1;
        tmpBorderColor[$deleteIdx] = "#FF8A27";
        tmpFontColor[$deleteIdx] = "#F2F2F2";
        tmpNodeColor[$deleteIdx] = "#FF8A27";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 3. 바꿀 경로에 있는 노드의 테두리, 폰트 색깔 변경 
        let changeNode = []
        let pathHeap = [...tmpHeap]; // 경로 체크를 위한 임시 힙
        let curNode = $deleteIdx;
        let nxtNode = Math.floor(curNode / 2);

        while(curNode >= 2 && (pathHeap[curNode] > pathHeap[nxtNode])) {
            // 바꿀 경로에 있는 노드 색깔 변경 {border: crimson, font: crimson, node: crimson}
            tmpBorderColor[nxtNode] = "#D9513C";
            tmpFontColor[nxtNode] = "#D9513C";
            changeNode.push(nxtNode);

            [pathHeap[curNode], pathHeap[nxtNode]] = [pathHeap[nxtNode], pathHeap[curNode]];

            curNode = nxtNode;
            nxtNode = Math.floor(curNode / 2);
        }
  
        tmpBlack = 20;
        tmpNatural = `Invalid nodes are shown in red.`;
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

        // 힙이 완성될때까지 swap
        let swappedNode = 0;
        curNode = $deleteIdx;
        nxtNode = Math.floor(curNode / 2);  
        
        while(curNode >= 2 && (tmpHeap[curNode] > tmpHeap[nxtNode])) {
            // 4. swap할 노드의 테두리, 폰트 변경 + swap 완료한 노드의 테두리, 폰트 변경
            tmpBlack = 0;
            tmpNatural = `${tmpHeap[curNode]} > ${tmpHeap[nxtNode]}, so swap them.`;
            // 현재 노드 주황색 {border: orange, font: white, node: orange}
            tmpBorderColor[curNode] = "#FF8A27";
            tmpFontColor[curNode] = "#F2F2F2";
            tmpNodeColor[curNode] = "#FF8A27";
            // swap 할 노드 주황색 {border: orange, font: orange, node: white}
            tmpBorderColor[nxtNode] = "#FF8A27";
            tmpFontColor[nxtNode] = "#FF8A27";
            tmpNodeColor[nxtNode] = "#F2F2F2";
            // swap 한 노드 검은색 {border: black, font: black, node: white}
            tmpBorderColor[swappedNode] = "#000000";
            tmpFontColor[swappedNode] = "#000000";
            tmpNodeColor[swappedNode] = "#F2F2F2";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

            // 5. 스왑 완료
            tmpBlack = 0;
            tmpNatural = `${tmpHeap[curNode]} <-> ${tmpHeap[nxtNode]} have been swapped.`;
            [tmpHeap[curNode], tmpHeap[nxtNode]] = [tmpHeap[nxtNode], tmpHeap[curNode]];
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, curNode, nxtNode, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            swappedNode = curNode;
            curNode = nxtNode;
            nxtNode = Math.floor(curNode / 2);  
        }

        // 6. 삭제할 노드 루트 노드로 이동 완료
        tmpBlack = 1;
        tmpNatural = "Root stores the max item.";
        // 현재 노드 주황색 {border: orange, font: white, node: orange}
        tmpBorderColor[curNode] = "#FF8A27";
        tmpFontColor[curNode] = "#F2F2F2";
        tmpNodeColor[curNode] = "#FF8A27";
        // swap 한 노드 검은색 {border: black, font: black, node: white}
        tmpBorderColor[swappedNode] = "#000000";
        tmpFontColor[swappedNode] = "#000000";
        tmpNodeColor[swappedNode] = "#F2F2F2";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

        // 7. 루트 노드 삭제
        let retValue = tmpHeap[1];
        tmpNatural = `Take out the root ${tmpHeap[1]}.`;
        tmpBlack = 1;
        //  루트 노드 투명하게 변경 {border: transparent, font: transparent, node: transparent}
        tmpBorderColor[1] = "rgba(255, 255, 255, 0)";
        tmpFontColor[1] = "rgba(255, 255, 255, 0)";
        tmpNodeColor[1] = "rgba(255, 255, 255, 0)";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 8. 맨 뒤 노드 선택
        tmpNatural = `Replace root with the last leaf ${tmpHeap[tmpCnt]}.`;
        tmpBlack = 1;
        // 맨 뒤 노드 색깔 변경 {border: orange, font: white, node: orange}
        tmpBorderColor[tmpCnt] = "#FF8A27";
        tmpFontColor[tmpCnt] = "#F2F2F2";
        tmpNodeColor[tmpCnt] = "#FF8A27";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 9. 맨 뒤 노드 루트 노드로 이동
        tmpNatural = "The new root.";
        tmpBlack = 1;
        tmpHeap[1] = tmpHeap[tmpCnt];
        tmpInvisibleIndex = tmpCnt;
        tmpHeap[tmpCnt--] = null;
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, tmpCnt + 1, 1, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 10. 바꿀 경로에 있는 노드의 색깔 변경 
        // 루트 노드 색깔 변경 {border: orange, font: white, node: orange} <- 이전에 투명색이었음
        tmpBorderColor[1] = "#FF8A27";
        tmpFontColor[1] = "#F2F2F2";
        tmpNodeColor[1] = "#FF8A27";    
        changeNode = []
        pathHeap = [...tmpHeap]; // 경로 체크를 위한 임시 힙
        curNode = 1, nxtNode;

        while(curNode * 2 < tmpCnt) {
            if(pathHeap[curNode * 2 + 1] === null) {
                nxtNode = pathHeap[curNode * 2] > pathHeap[curNode] ? curNode * 2 : -1;
            }
            else {
                nxtNode = pathHeap[curNode * 2] > pathHeap[curNode * 2 + 1] ? curNode * 2 : curNode * 2 + 1;
                nxtNode = pathHeap[curNode] > pathHeap[nxtNode] ? -1 : nxtNode;
            }

            if(nxtNode === -1) {
                break;
            }

            // 바꿀 경로에 있는 노드 색깔 변경 {border: crimson, font: crimson, node: crimson}
            tmpBorderColor[nxtNode] = "#D9513C";
            tmpFontColor[nxtNode] = "#D9513C";
            changeNode.push(nxtNode);

            [pathHeap[curNode], pathHeap[nxtNode]] = [pathHeap[nxtNode], pathHeap[curNode]];

            curNode = nxtNode;
        }
    
         if(changeNode.length > 0) {
            tmpBlack = 20;
            tmpNatural = `Invalid nodes are shown in red.`;
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    
        }

        // 힙이 완성될때까지 swap
        swappedNode = 0;
        curNode = 1;
            
        while(curNode * 2 < tmpCnt) {
            if(tmpHeap[curNode * 2 + 1] === null) {
                nxtNode = tmpHeap[curNode * 2] > tmpHeap[curNode] ? curNode * 2 : -1;
            }
            else {
                nxtNode = tmpHeap[curNode * 2] > tmpHeap[curNode * 2 + 1] ? curNode * 2 : curNode * 2 + 1;
                nxtNode = tmpHeap[curNode] > tmpHeap[nxtNode] ? -1 : nxtNode;
            }

            if(nxtNode === -1) {
                break;
            }

            // 11. swap할 노드의 테두리, 폰트 변경 + swap 완료한 노드의 테두리, 폰트 변경
            tmpBlack = 1;
            tmpNatural = `${tmpHeap[nxtNode]} > ${tmpHeap[curNode]}, so swap them.`;
            // 현재 노드 주황색 {border: orange, font: white, node: orange}
            tmpBorderColor[curNode] = "#FF8A27";
            tmpFontColor[curNode] = "#F2F2F2";
            tmpNodeColor[curNode] = "#FF8A27";
            // swap 할 노드 주황색 {border: orange, font: orange, node: white}
            tmpBorderColor[nxtNode] = "#FF8A27";
            tmpFontColor[nxtNode] = "#FF8A27";
            tmpNodeColor[nxtNode] = "#F2F2F2";
            // swap 한 노드 검은색 {border: black, font: black, node: white}
            tmpBorderColor[swappedNode] = "#000000";
            tmpFontColor[swappedNode] = "#000000";
            tmpNodeColor[swappedNode] = "#F2F2F2";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

            // 12. 스왑 완료
            tmpBlack = 1;
            tmpNatural = `${tmpHeap[curNode]} <-> ${tmpHeap[nxtNode]} have been swapped.`;
            [tmpHeap[curNode], tmpHeap[nxtNode]] = [tmpHeap[nxtNode], tmpHeap[curNode]];
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, curNode, nxtNode, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            swappedNode = curNode;
            curNode = nxtNode;
        }

        // 13. 힙 완성
        tmpBlack = 20;
        tmpNatural = `ExtractMax() has been completed.<br/>We return the max item: ${retValue}.`;
        tmpFontColor = Array(32).fill("#000000");
        tmpNodeColor = Array(32).fill("#F2F2F2");
        tmpBorderColor = Array(32).fill("#000000");
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);
    };

    const preDrawCreate = () => {
        animationSteps = [];
        let tmpHeap = Array(32).fill(null);
        let tmpFontColor = Array(32).fill("#000000");
        let tmpNodeColor = Array(32).fill("#F2F2F2");
        let tmpBorderColor = Array(32).fill("#000000");
        let tmpNatural = "";
        let tmpBlack = 20; // 20 -> NONE
        let tmpCnt = $elementCnt;
        let tmpInvisibleIndex = 0;

        // 1. 초기 힙
        tmpBlack = 0;
        tmpCnt = 0;
        tmpNatural = "Start from an empty Binary Max Heap.";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 2. 새로운 원소 루트 노드로
        tmpBlack = 1;
        tmpNatural = `${$tmpCreateHeap[++tmpCnt]} is inserted.<br/>It becomes the new root.`
        tmpHeap[tmpCnt] = $tmpCreateHeap[tmpCnt];
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

        // 힙 구성하기
        for(let cnt = 2; cnt < $tmpCreateHeap.length; cnt++) {
            // 3. 현재 힙 보여주기
            tmpNatural = "The current Binary Max Heap";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            // 4. 새로운 원소 마지막에 삽입
            tmpCnt++;
            tmpHeap[tmpCnt] = $tmpCreateHeap[tmpCnt];
            tmpNatural = `${tmpHeap[tmpCnt]} is inserted at the back of compact array A.`
            // 추가한 노드 주황색 {border: orange, font: orange, node: white}
            tmpBorderColor[tmpCnt] = "#FF8A27";
            tmpFontColor[tmpCnt] = "#F2F2F2";
            tmpNodeColor[tmpCnt] = "#FF8A27";
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 99, 99, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

            // 5. 바꿀 경로에 있는 노드의 테두리, 폰트 색깔 변경 
            let changeNode = []
            let pathHeap = [...tmpHeap]; // 경로 체크를 위한 임시 힙
            let curNode = tmpCnt;
            let nxtNode = Math.floor(curNode / 2);

            while(curNode >= 2 && (pathHeap[curNode] > pathHeap[nxtNode])) {
                // 바꿀 경로에 있는 노드 색깔 변경 {border: crimson, font: crimson, node: crimson}
                tmpBorderColor[nxtNode] = "#D9513C";
                tmpFontColor[nxtNode] = "#D9513C";
                changeNode.push(nxtNode);

                [pathHeap[curNode], pathHeap[nxtNode]] = [pathHeap[nxtNode], pathHeap[curNode]];

                curNode = nxtNode;
                nxtNode = Math.floor(curNode / 2);
            }
    
            if(changeNode.length > 0) {
                tmpBlack = 20;
                tmpNatural = `Invalid nodes are shown in red.`;
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    
            } 

            // 힙이 완성될때까지 swap
            let swappedNode = 0;
            curNode = tmpCnt;
            nxtNode = Math.floor(curNode / 2);  
            
            while(curNode >= 2 && (tmpHeap[curNode] > tmpHeap[nxtNode])) {
                // 6. swap할 노드의 테두리, 폰트 변경 + swap 완료한 노드의 테두리, 폰트 변경
                tmpBlack = 1;
                tmpNatural = `${tmpHeap[curNode]} > ${tmpHeap[nxtNode]}, so swap them.`;
                // 현재 노드 주황색 {border: orange, font: white, node: orange}
                tmpBorderColor[curNode] = "#FF8A27";
                tmpFontColor[curNode] = "#F2F2F2";
                tmpNodeColor[curNode] = "#FF8A27";
                // swap 할 노드 주황색 {border: orange, font: orange, node: white}
                tmpBorderColor[nxtNode] = "#FF8A27";
                tmpFontColor[nxtNode] = "#FF8A27";
                tmpNodeColor[nxtNode] = "#F2F2F2";
                // swap 한 노드 검은색 {border: black, font: black, node: white}
                tmpBorderColor[swappedNode] = "#000000";
                tmpFontColor[swappedNode] = "#000000";
                tmpNodeColor[swappedNode] = "#F2F2F2";
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);    

                // 7. 스왑 완료
                tmpBlack = 1;
                tmpNatural = `${tmpHeap[curNode]} <-> ${tmpHeap[nxtNode]} have been swapped.`;
                [tmpHeap[curNode], tmpHeap[nxtNode]] = [tmpHeap[nxtNode], tmpHeap[curNode]];
                pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, curNode, nxtNode, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);

                swappedNode = curNode;
                curNode = nxtNode;
                nxtNode = Math.floor(curNode / 2);  
            }

            // 8. 힙 정렬 완료
            tmpBlack = 20;
            tmpNatural = `${swappedNode} has been inserted successfully.`;
            tmpFontColor = Array(32).fill("#000000");
            tmpNodeColor = Array(32).fill("#F2F2F2");
            tmpBorderColor = Array(32).fill("#000000");
            pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);
        }

        // 9. 전체 힙 구성 완료
        tmpBlack = 20;
        tmpNatural = "The Binary Max Heap has been created from array A";
        pushAnimationSteps(tmpHeap, tmpFontColor, tmpNodeColor, tmpBorderColor, 0, 0, tmpNatural, tmpBlack, tmpCnt, tmpInvisibleIndex);
    };

    const changeCodeColorBlack = (idx) => {
        for(let i = 0; i < $codeColor.length; i++) {
            if(i == idx) {
                $codeColor[i] = "rgb(0, 0, 0)";
            }
            else {
                $codeColor[i] = "rgba(255, 255, 255, 0)";
            }
        }
    };

    const draw = async () => {
        $animationCnt = [0, animationSteps.length - 1];

        while($animationCnt[0] <= $animationCnt[1]) {
            if($isBegin || $isEnd) {
                if($isBegin) {
                    $animationCnt[0] = 0;
                }
                else {
                    $animationCnt[0] = animationSteps.length - 1;
                }

                $heap = [...animationSteps[$animationCnt[0]].curHeap];
                isIndexVisible[animationSteps[$animationCnt[0]].curInvisibleIndex] = false;
                $elementCnt = animationSteps[$animationCnt[0]].curCnt; // $elementCnt 수정
                $naturalLang = animationSteps[$animationCnt[0]].curNatural; // naturalLang 수정
                changeCodeColorBlack(animationSteps[$animationCnt[0]].curBlack); // codeToggle 수정
                await tick();

                const graphElements = document.querySelectorAll('.graph');

                // 그래프 색상 수정
                graphElements.forEach(async (element, idx) => {
                    element.style.color = animationSteps[$animationCnt[0]].curFontColor[idx + 1];
                    element.style.borderColor = animationSteps[$animationCnt[0]].curBorderColor[idx + 1];
                    element.style.backgroundColor = animationSteps[$animationCnt[0]].curNodeColor[idx + 1];
                });

                $isBegin = $isEnd = false;
            }

            await waitPause();

            // 맨 처음 insert때만 heap copy -> 화면에 바로 표시
            if($animationCnt[0] == 1) {
                $heap = [...animationSteps[$animationCnt[0]].curHeap];
            }
            // create시 힙 반영
            else if(animationSteps[$animationCnt[0]].curSwap1 == 99) {
                $heap = [...animationSteps[$animationCnt[0]].curHeap];
            }

            isIndexVisible[animationSteps[$animationCnt[0]].curInvisibleIndex] = false;
            $elementCnt = animationSteps[$animationCnt[0]].curCnt; // $elementCnt 수정
            $naturalLang = animationSteps[$animationCnt[0]].curNatural; // naturalLang 수정
            changeCodeColorBlack(animationSteps[$animationCnt[0]].curBlack); // codeToggle 수정
            await tick();

            const graphElements = document.querySelectorAll('.graph');

            // 그래프 색상 수정
            graphElements.forEach(async (element, idx) => {
                element.style.color = animationSteps[$animationCnt[0]].curFontColor[idx + 1];
                element.style.borderColor = animationSteps[$animationCnt[0]].curBorderColor[idx + 1];
                element.style.backgroundColor = animationSteps[$animationCnt[0]].curNodeColor[idx + 1];
            });

            // swap이 필요한 경우에만
            if(animationSteps[$animationCnt[0]].curSwap1 != animationSteps[$animationCnt[0]].curSwap2) {
                let swap1 = animationSteps[$animationCnt[0]].curSwap1;
                let swap2 = animationSteps[$animationCnt[0]].curSwap2;
                
                graphElements.forEach(element => {
                    element.style.transition = `top ${2 * (1 / $animationSpeed)}s ease, left ${2 * (1 / $animationSpeed)}s ease`;
                });

                // swap animation
                [graphLeft[swap1], graphLeft[swap2]] = [graphLeft[swap2], graphLeft[swap1]];
                [graphTop[swap1], graphTop[swap2]] = [graphTop[swap2], graphTop[swap1]];

                await delay(2000 * (1 / $animationSpeed));

                // 실제 데이터 수정
                [animationSteps[$animationCnt[0]].curFontColor[swap1], animationSteps[$animationCnt[0]].curFontColor[swap2]]
                = [animationSteps[$animationCnt[0]].curFontColor[swap2], animationSteps[$animationCnt[0]].curFontColor[swap1]];

                [animationSteps[$animationCnt[0]].curBorderColor[swap1], animationSteps[$animationCnt[0]].curBorderColor[swap2]]
                = [animationSteps[$animationCnt[0]].curBorderColor[swap2], animationSteps[$animationCnt[0]].curBorderColor[swap1]];

                [animationSteps[$animationCnt[0]].curNodeColor[swap1], animationSteps[$animationCnt[0]].curNodeColor[swap2]]
                = [animationSteps[$animationCnt[0]].curNodeColor[swap2], animationSteps[$animationCnt[0]].curNodeColor[swap1]];

                graphElements.forEach(async (element, idx) => {
                    element.style.transition = "top 0s ease, left 0s ease";
                    element.style.color = animationSteps[$animationCnt[0]].curFontColor[idx + 1];
                    element.style.borderColor = animationSteps[$animationCnt[0]].curBorderColor[idx + 1];
                    element.style.backgroundColor = animationSteps[$animationCnt[0]].curNodeColor[idx + 1];
                });

                $heap = [...animationSteps[$animationCnt[0]].curHeap];
                
                [graphLeft[swap1], graphLeft[swap2]] = [graphLeft[swap2], graphLeft[swap1]];
                [graphTop[swap1], graphTop[swap2]] = [graphTop[swap2], graphTop[swap1]];
            }
            else {
                await delay(2000 * (1 / $animationSpeed));
            }

            $animationCnt[0]++;
        }

        await tick();

        isIndexVisible = Array(32).fill(true);
        $animationWorking = false;
    }
</script>

<main>
    <svg class="lines" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        {#each $heap as element, index}
            {#if element != null}
                <!-- 왼쪽 자식 노드에 간선 추가 (고정된 좌표 사용) -->
                {#if index * 2 <= $elementCnt}
                    <line 
                        x1={initialGraphLeft[index] + 16} 
                        y1={initialGraphTop[index] + 8} 
                        x2={initialGraphLeft[index * 2] + 16} 
                        y2={initialGraphTop[index * 2] + 8} 
                        stroke="black" 
                        stroke-width="2"/>
                {/if}

                <!-- 오른쪽 자식 노드에 간선 추가 (고정된 좌표 사용) -->
                {#if index * 2 + 1 <= $elementCnt}
                    <line 
                        x1={initialGraphLeft[index] + 24} 
                        y1={initialGraphTop[index] + 8} 
                        x2={initialGraphLeft[index * 2 + 1] + 24} 
                        y2={initialGraphTop[index * 2 + 1] + 8} 
                        stroke="black" 
                        stroke-width="2"/>
                {/if}
            {/if}
        {/each}
    </svg>

    {#each $heap as element, index}
        {#if element != null}
            <div class="graph" style="top: {graphTop[index]}px; left: {graphLeft[index]}px;">
                <span class="element">
                    {element}
                    <div class="transparent-idx transparent-idx-{index}">{index}</div>
                </span>
            </div>
            {#if isIndexVisible[index] == true}
                <span class="index" style="top: {indexTop[index]}px; left: {indexLeft[index]}px;">{index}</span>
            {/if}
        {/if}
    {/each}
</main>

<style>
    main {
        height: 100%; 
        width: 100%;   
        background-color: #eeeeee;
    }

    .graph {
        position: absolute;
        width: 32px;
        height: 32px;
        border: 4px solid black;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F2F2F2;
        transition: top 2s ease, left 2s ease; 
    }

    .element {
        font-size: 16px;
    }

    .transparent-idx {
        position: absolute;
        top: 100%;
        left: 50%; 
        transform: translateX(-50%); 
        margin-top: 6px;
        font-size: 16px;
        color: transparent;
    }

    .index {
        position: absolute;
        font-size: 16px;
        color: red;
    }
</style>