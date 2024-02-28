document.querySelectorAll(".calc-container input[type=button]").forEach((e) => {
  e.onclick = () => {
    const c = e.value;
    const out = document.querySelector(".calc-container input[name=out]");
    if (c == "=") {
      try {
        out.value = calc(out.value);
      } catch (e) {
        out.value = "Error";
      }
    }
    else if (e.name == "clear") {
      if (out.value.length > 0)
        out.value = out.value.substring(0, out.value.length - 1);
    } else out.value += e.value;
  }
});

let clearScreenTimmer = null;

const createTimmer = () => {
  clearTimmer = setTimeout(() => {
    const out = document.querySelector(".calc-container input[name=out]");
    out.value = "";
  }, 1000);
}

const removeTimmer = () => {
  if (clearTimmer) clearTimeout(clearTimmer);
}

document.querySelector(".calc-container input[name=clear]").onmousedown = createTimmer;
document.querySelector(".calc-container input[name=clear]").onmouseup = removeTimmer;
document.querySelector(".calc-container input[name=clear]").ontouchstart = createTimmer;
document.querySelector(".calc-container input[name=clear]").ontouchend = removeTimmer;

const oprs = ["-", "+", "*", "/"];

const calc = (infix, opr = 0) => {
  infix = infix.replace(" ", "");
  let answer = null;
  let parts = infix.split(oprs[opr]);

  for (let i = 0; i < parts.length; i++) {
    let num = Number(parts[i]);
    if (isNaN(num) && opr < oprs.length)
      num = calc(parts[i], opr + 1);

    if (answer == null) {
      answer = num;
      continue;
    }

    switch (opr) {
      case 3:
        answer /= num;
        break;
      case 2:
        answer *= num;
        break;
      case 1:
        answer += num;
        break;
      case 0:
        answer -= num;
        break;
    }
  }
  return answer;
}
