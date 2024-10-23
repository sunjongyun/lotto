// src/main.js
import { generateLottoNumbers } from './lottoGenerator.js';

document.getElementById('generateButton').addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    document.getElementById('lottoNumbers').textContent = `생성된 번호: ${numbers.join(', ')}`;
});

/* 번호 입력 */
document.querySelector('#insertNumber').addEventListener('click', () => {

    // 입력된 번호가 숫자인지 확인
    if (isNaN(document.querySelector('#winningNumberInput').value)) {
        alert('숫자를 입력해주세요.');
        return;
    }

    // 입력된 번호가 1~45 사이의 숫자인지 확인
    if (document.querySelector('#winningNumberInput').value < 1 || document.querySelector('#winningNumberInput').value > 45) {
        alert('1~45 사이의 숫자를 입력해주세요.');
        return;
    }

    // 입력된 번호가 중복인지 확인
    const numberList = document.querySelectorAll('#numberList > ul > li');
    const length = numberList.length;

    for (let i = 0; i < length; i++) {
        if (numberList[i].textContent === document.querySelector('#winningNumberInput').value) {
            // 입력된 번호 삭제
            document.querySelector('#winningNumberInput').value = '';

            // focus
            document.querySelector('#winningNumberInput').focus();
            // alert('중복된 번호입니다.'); // alert는 사용자 경험을 해친다.
            return;
        }
    }

    const li = document.createElement('li');
    li.textContent = document.querySelector('#winningNumberInput').value;

    const ul = document.querySelector('#numberList > ul');

    // li 추가를 하는데, li를 오름차순으로 추가
    let isAdded = false;
    for (let i = 0; i < length; i++) {
        if (parseInt(numberList[i].textContent) > parseInt(document.querySelector('#winningNumberInput').value)) {
            ul.insertBefore(li, numberList[i]);
            isAdded = true;
            break;
        }
    }

    if (!isAdded) {
        ul.appendChild(li);
    }

    // ul.appendChild(li);

    // document.querySelector('#numberList').textContent += (document.querySelector('#winningNumberInput').value + '<br>');


    // 입력된 번호 삭제
    document.querySelector('#winningNumberInput').value = '';

    // focus
    document.querySelector('#winningNumberInput').focus();
});

/* enter 키 입력 이벤트도 추가 */
document.querySelector('#winningNumberInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('#insertNumber').click();
    }
});

/* 번호 삭제 */
document.querySelector('#resetNumber').addEventListener('click', () => {

    document.querySelector('#numberList > ul').innerHTML = '';
});

/* 로또번호 산출하기 */
document.querySelector('#extractNumberBtn').addEventListener('click', () => {

    const numberList = document.querySelectorAll('#numberList > ul > li');
    const length = numberList.length;

    console.log(`length: ${length}`);

    if(length < 6) {
        alert('번호를 6개 이상 입력해주세요.');
        return;
    }

    // length의 값중 랜덤으로 6개 뽑기
    const indexes = new Set();
    while (indexes.size < 6) {
        const randomNumber = Math.floor(Math.random() * length);
        indexes.add(randomNumber);
    }
    console.log(indexes);

    const mapped = [...indexes].map((index) => {
        return numberList[index].textContent;
    });

    mapped.sort(function(a, b) {
        return a - b;
    });

    console.log(`mapped: ${mapped}`);

    const li = document.createElement('li');
    li.textContent = mapped.join(', ');

    document.querySelector('#extractNumberList > ul').appendChild(li);
});

/* 로또번호 삭제 */
document.querySelector('#resetExtractedNumber').addEventListener('click', () => {

    document.querySelector('#extractNumberList > ul').innerHTML = '';
});