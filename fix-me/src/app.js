const ROUND_SECONDS = 150;
const POINTS = { correct: 100, hint: 25, maxTimeBonus: 50 };
const BOARD_KEY = "fix-me-updated-board";

const CHALLENGES = {
  java: [
    {
      id: "java-welcome", level: "01", difficulty: "سهل", title: "حرف ناقص", subtitle: "رسالة الترحيب لا تجتاز الاختبار.", objective: "عدّل الدالة حتى تعيد رسالة الترحيب الدقيقة.", file: "Welcome.java", roundName: "تحليل الكود",
      starter: `public class Welcome {
  public static String welcome() {
    return "Helo";
  }
}`,
      solution: `public class Welcome {
  public static String welcome() {
    return "Hello";
  }
}`,
      explanation: "القيمة Helo ينقصها حرف l؛ المطلوب أن تعيد الدالة النص Hello كما هو.", hint: "راجع كل حروف النص الذي تعيده الدالة.",
      tests: ["رسالة ترحيب صحيحة", "نتيجة نصّية دقيقة", "تعديل بسيط"],
      checks: [code => /return\s+"Hello"\s*;/.test(code), code => !/Helo/.test(code) && /String\s+welcome/.test(code), code => /public\s+class\s+Welcome/.test(code)]
    },
    {
      id: "java-score", level: "02", difficulty: "متوسط", title: "بوابة النجاح", subtitle: "حالة واحدة عند الحدّ لا تُحسب.", objective: "احسب الدرجات التي وصلت إلى 60 أو تجاوزتها.", file: "ScoreTools.java", roundName: "تتبّع الحلقة",
      starter: `public class ScoreTools {
  public static int countPassed(int[] scores) {
    int count = 0;
    for (int score : scores) {
      if (score > 60) count++;
    }
    return count;
  }
}`,
      solution: `public class ScoreTools {
  public static int countPassed(int[] scores) {
    int count = 0;
    for (int score : scores) {
      if (score >= 60) count++;
    }
    return count;
  }
}`,
      explanation: "الدرجة 60 ناجحة، لذلك نستخدم >= بدل > حتى تُحتسب حالة الحدّ.", hint: "اختبر حالة تساوي العتبة تمامًا.",
      tests: ["countPassed({55, 60, 90}) = 2", "countPassed({60}) = 1", "مقارنة صحيحة"],
      checks: [code => /score\s*>=\s*60/.test(code), code => /countPassed\s*\(\s*int\[\]\s+scores\s*\)/.test(code), code => !/score\s*>\s*60/.test(code)]
    },
    {
      id: "java-largest", level: "03", difficulty: "متوسط مرتفع", title: "العنصر الأثقل", subtitle: "البداية والاتجاه يغيّران النتيجة.", objective: "أعد أكبر رقم في المصفوفة، بما في ذلك القيم السالبة.", file: "ArrayTools.java", roundName: "تثبيت المنطق",
      starter: `public class ArrayTools {
  public static int max(int[] numbers) {
    int best = 0;
    for (int number : numbers) {
      if (number < best) best = number;
    }
    return best;
  }
}`,
      solution: `public class ArrayTools {
  public static int max(int[] numbers) {
    int best = numbers[0];
    for (int number : numbers) {
      if (number > best) best = number;
    }
    return best;
  }
}`,
      explanation: "البدء من 0 يفشل مع القيم السالبة. ابدأ من أول عنصر واحتفظ بالأكبر فقط.", hint: "راقب أول قيمة قبل بدء الدوران.",
      tests: ["max({-5, -2, -9}) = -2", "max({4, 1, 7}) = 7", "اتجاه مقارنة صحيح"],
      checks: [code => /int\s+best\s*=\s*numbers\s*\[\s*0\s*\]/.test(code), code => /number\s*>\s*best/.test(code), code => !/number\s*<\s*best/.test(code)]
    },
    {
      id: "java-order", level: "04", difficulty: "متوسط", title: "إجمالي الطلب", subtitle: "الإجمالي الحالي يجمع السعر والكمية بدل حساب قيمة الطلب.", objective: "أعد السعر مضروبًا في الكمية.", file: "Order.java", roundName: "حساب النتيجة",
      starter: `public class Order {
  public static int total(int price, int quantity) {
    return price + quantity;
  }
}`,
      solution: `public class Order {
  public static int total(int price, int quantity) {
    return price * quantity;
  }
}`,
      explanation: "إجمالي الطلب هو سعر القطعة في عدد القطع؛ العملية الصحيحة هي الضرب لا الجمع.", hint: "فكّر في معنى إجمالي عند وجود أكثر من قطعة.",
      tests: ["total(25, 3) = 75", "total(10, 1) = 10", "عملية ضرب صحيحة"],
      checks: [code => /return\s+price\s*\*\s*quantity\s*;/.test(code), code => /total\s*\(\s*int\s+price\s*,\s*int\s+quantity\s*\)/.test(code), code => !/return\s+price\s*\+\s*quantity/.test(code)]
    },
    {
      id: "java-text", level: "05", difficulty: "متوسط", title: "مقارنة النصوص", subtitle: "المقارنة تعمل ظاهريًا لكنها لا تقارن محتوى النصين.", objective: "تحقق من تساوي محتوى النصين في Java.", file: "TextTools.java", roundName: "تثبيت الحل",
      starter: `public class TextTools {
  public static boolean same(String first, String second) {
    return first == second;
  }
}`,
      solution: `public class TextTools {
  public static boolean same(String first, String second) {
    return first.equals(second);
  }
}`,
      explanation: "== يقارن المراجع في Java، بينما equals تقارن محتوى النصين.", hint: "استخدم دالة String المخصصة لمقارنة المحتوى.",
      tests: ["same(\"FIX\", \"FIX\") = true", "مقارنة محتوى النص", "عدم استخدام =="],
      checks: [code => /first\.equals\s*\(\s*second\s*\)/.test(code), code => /boolean\s+same\s*\(\s*String\s+first\s*,\s*String\s+second\s*\)/.test(code), code => !/first\s*==\s*second/.test(code)]
    }
  ],
  python: [
    {
      id: "py-even", level: "01", difficulty: "سهل", title: "زوجي أم فردي؟", subtitle: "الدالة تعيد نفس القيمة مهما كان الرقم.", objective: "أعد True للأرقام الزوجية وFalse لغيرها.", file: "parity.py", roundName: "تحليل الكود",
      starter: `def is_even(number):
    return True`, solution: `def is_even(number):
    return number % 2 == 0`,
      explanation: "إذا كان باقي قسمة الرقم على 2 يساوي صفرًا، فالرقم زوجي.", hint: "قارن باقي القسمة على 2 بالصفر.",
      tests: ["is_even(8) = True", "is_even(7) = False", "قيمة منطقية"],
      checks: [code => /number\s*%\s*2\s*==\s*0/.test(code), code => /def\s+is_even\s*\(\s*number\s*\)/.test(code), code => !/return\s+True\s*$/m.test(code)]
    },
    {
      id: "py-score", level: "02", difficulty: "متوسط", title: "بوابة النجاح", subtitle: "حالة واحدة عند الحدّ لا تُحسب.", objective: "احسب الدرجات التي وصلت إلى 60 أو تجاوزتها.", file: "score_tools.py", roundName: "تتبّع الحلقة",
      starter: `def count_passed(scores):
    count = 0
    for score in scores:
        if score > 60:
            count += 1
    return count`, solution: `def count_passed(scores):
    count = 0
    for score in scores:
        if score >= 60:
            count += 1
    return count`,
      explanation: "لأن 60 درجة نجاح، نستخدم >= لإدراج الدرجة المطابقة للحدّ.", hint: "اختبر قيمة 60 نفسها.",
      tests: ["count_passed([55, 60, 90]) = 2", "count_passed([60]) = 1", "مقارنة صحيحة"],
      checks: [code => /score\s*>=\s*60/.test(code), code => /def\s+count_passed\s*\(\s*scores\s*\)/.test(code), code => !/score\s*>\s*60/.test(code)]
    },
    {
      id: "py-largest", level: "03", difficulty: "متوسط مرتفع", title: "العنصر الأثقل", subtitle: "البداية والاتجاه يغيّران النتيجة.", objective: "أعد أكبر رقم في القائمة، بما في ذلك القيم السالبة.", file: "array_tools.py", roundName: "تثبيت المنطق",
      starter: `def largest(numbers):
    best = 0
    for number in numbers:
        if number < best:
            best = number
    return best`, solution: `def largest(numbers):
    best = numbers[0]
    for number in numbers:
        if number > best:
            best = number
    return best`,
      explanation: "نبدأ من أول عنصر حتى تتعامل الدالة مع القوائم السالبة، ثم نحتفظ بالأكبر.", hint: "تخيل قائمة تبدأ كلها تحت الصفر.",
      tests: ["largest([-5, -2, -9]) = -2", "largest([4, 1, 7]) = 7", "اتجاه مقارنة صحيح"],
      checks: [code => /best\s*=\s*numbers\s*\[\s*0\s*\]/.test(code), code => /number\s*>\s*best/.test(code), code => !/number\s*<\s*best/.test(code)]
    },
    {
      id: "py-greeting", level: "04", difficulty: "متوسط", title: "رسالة الترحيب", subtitle: "الاسم لا يظهر في رسالة الترحيب.", objective: "أعد رسالة ترحيب تتضمن اسم اللاعب.", file: "greeting.py", roundName: "حساب النتيجة",
      starter: `def greeting(name):
    return "Hello"`, solution: `def greeting(name):
    return "Hello, " + name`,
      explanation: "نضم النص الثابت إلى المتغير name حتى تظهر رسالة شخصية.", hint: "اجمع النص الثابت مع الاسم.",
      tests: ["greeting(\"Sara\") = Hello, Sara", "استخدام الاسم", "ناتج نصي"],
      checks: [code => /return\s+["']Hello,\s*["']\s*\+\s*name/.test(code), code => /def\s+greeting\s*\(\s*name\s*\)/.test(code), code => /name/.test(code)]
    },
    {
      id: "py-average", level: "05", difficulty: "متوسط", title: "المتوسط الصحيح", subtitle: "الدالة تجمع الأرقام فقط بدل إرجاع متوسطها.", objective: "أعد متوسط الأرقام في القائمة.", file: "average.py", roundName: "تثبيت الحل",
      starter: `def average(numbers):
    return sum(numbers)`, solution: `def average(numbers):
    return sum(numbers) / len(numbers)`,
      explanation: "المتوسط يساوي مجموع القيم مقسومًا على عددها، لذلك نستخدم len(numbers).", hint: "بعد جمع الأرقام، ما القيمة التي يجب أن نقسم عليها؟",
      tests: ["average([2, 4, 6]) = 4", "استخدام len", "قسمة صحيحة"],
      checks: [code => /sum\s*\(\s*numbers\s*\)\s*\/\s*len\s*\(\s*numbers\s*\)/.test(code), code => /def\s+average\s*\(\s*numbers\s*\)/.test(code), code => /len\s*\(\s*numbers\s*\)/.test(code)]
    }
  ]
};

const $ = id => document.querySelector(`#${id}`);
const ui = {
  landing: $("landingView"), game: $("gameView"), results: $("resultsView"), name: $("playerName"), error: $("landingError"), playerBadge: $("playerBadge"),
  language: $("gameLanguage"), difficulty: $("missionDifficulty"), title: $("challengeTitle"), subtitle: $("challengeSubtitle"), objective: $("challengeObjective"), tests: $("testList"), testCount: $("testCount"),
  round: $("roundLabel"), roundName: $("roundName"), timer: $("timer"), timerWrap: document.querySelector(".timer-wrap"), score: $("scoreValue"), combo: $("comboValue"), solved: $("streakValue"),
  file: $("fileName"), saveState: $("saveState"), code: $("codeEditor"), lines: $("lineNumbers"), editorLanguage: $("editorLang"), progress: $("progressBar"), console: $("consoleOutput"), hintText: $("editorHint"), coach: $("coachMessage"), hint: $("hintButton"), skip: $("skipButton"), run: $("runButton"), submit: $("submitButton"), reset: $("resetCode"),
  resultLanguage: $("resultLanguage"), resultMessage: $("resultMessage"), finalScore: $("finalScore"), finalRank: $("finalRank"), finalSolved: $("finalSolved"), finalStreak: $("finalStreak"), finalTime: $("finalTime"), review: $("answerReview"), leaderboard: $("leaderboardList"), toast: $("toast")
};
const state = { language: "", player: "", index: 0, score: 0, streak: 0, bestStreak: 0, remaining: ROUND_SECONDS, hints: 0, testsPassed: false, rounds: [], timer: null, locked: false, startedAt: 0 };
const current = () => CHALLENGES[state.language][state.index];
const roundCount = () => CHALLENGES[state.language].length;
const safe = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const time = seconds => `${String(Math.floor(Math.max(0, seconds) / 60)).padStart(2, "0")}:${String(Math.max(0, seconds) % 60).padStart(2, "0")}`;
const score = value => String(Math.max(0, Math.round(value))).padStart(3, "0");

function show(view) { [ui.landing, ui.game, ui.results].forEach(item => item.classList.remove("active")); view.classList.add("active"); window.scrollTo({ top: 0, behavior: "smooth" }); }
function toast(message) { ui.toast.textContent = message; ui.toast.classList.add("show"); clearTimeout(toast.id); toast.id = setTimeout(() => ui.toast.classList.remove("show"), 2400); }
function updateStats() { ui.score.textContent = score(state.score); ui.combo.textContent = `×${Math.max(1, state.streak)}`; ui.solved.textContent = String(state.rounds.filter(row => row.solved).length).padStart(2, "0"); ui.timer.textContent = time(state.remaining); }
function updateLineNumbers() { if (ui.lines) ui.lines.textContent = Array.from({ length: Math.max(5, ui.code.value.split("\n").length) }, (_, index) => index + 1).join("\n"); }
function renderRound() {
  const item = current();
  ui.playerBadge.textContent = state.player; ui.language.textContent = state.language.toUpperCase(); ui.difficulty.textContent = `LEVEL ${item.level} · ${item.difficulty}`;
  ui.title.textContent = item.title; ui.subtitle.textContent = item.subtitle; ui.objective.textContent = item.objective; ui.round.textContent = `ROUND ${item.level} / ${String(roundCount()).padStart(2, "0")}`; ui.roundName.textContent = item.roundName;
  ui.file.textContent = item.file; if (ui.editorLanguage) ui.editorLanguage.textContent = state.language.toUpperCase(); if (ui.progress) ui.progress.style.width = `${((state.index + 1) / roundCount()) * 100}%`; ui.code.value = item.starter; updateLineNumbers(); ui.tests.innerHTML = item.tests.map(test => `<li>○ ${safe(test)}</li>`).join(""); ui.testCount.textContent = `00 / ${String(item.tests.length).padStart(2, "0")}`;
  ui.console.className = "console"; ui.console.textContent = "$ Ready. افحص الكود ثم شغّل الاختبارات."; ui.saveState.textContent = "UNSAVED"; ui.hintText.textContent = "يمكنك تجاوز السؤال؛ النتيجة ونموذج الحل سيظهران في النهاية."; ui.coach.textContent = "النقاط لا تُحتسب إلا عند نجاح كل الاختبارات.";
  ui.hint.disabled = false; ui.hint.innerHTML = "استخدم تلميحًا <b>−25 نقطة</b>"; ui.skip.disabled = false; ui.run.disabled = false; ui.submit.disabled = true; updateStats();
}
function startTimer() { clearInterval(state.timer); state.timer = setInterval(() => { state.remaining -= 1; updateStats(); ui.timerWrap.classList.toggle("warning", state.remaining <= 20); if (state.remaining <= 0) finishUnsolved("انتهى وقت السؤال"); }, 1000); }
function stopTimer() { clearInterval(state.timer); state.timer = null; }
function startGame(language) { Object.assign(state, { language, player: ui.name.value.trim() || "لاعب", index: 0, score: 0, streak: 0, bestStreak: 0, remaining: ROUND_SECONDS, hints: 0, testsPassed: false, rounds: [], locked: false, startedAt: Date.now() }); ui.error.textContent = ""; show(ui.game); renderRound(); startTimer(); }
function runChecks() {
  if (state.locked || state.remaining <= 0) return;
  const item = current(), results = item.checks.map(check => Boolean(check(ui.code.value))), passed = results.every(Boolean); state.testsPassed = passed;
  [...ui.tests.children].forEach((row, index) => { row.classList.toggle("pass", results[index]); row.textContent = `${results[index] ? "✓" : "○"} ${item.tests[index]}`; }); ui.testCount.textContent = `${String(results.filter(Boolean).length).padStart(2, "0")} / ${String(results.length).padStart(2, "0")}`;
  ui.console.className = `console ${passed ? "success" : "fail"}`; ui.console.textContent = passed ? `$ Running test suite...\n✓ All tests passed\n\nSUCCESS — ثبّت الحل لحفظ نقاطك.` : `$ Running test suite...\n✕ ${results.filter(Boolean).length}/${results.length} tests passed\n\nTrace: راجع المنطق وجرب مرة أخرى.`; ui.submit.disabled = !passed; ui.saveState.textContent = "CHECKED"; ui.coach.textContent = passed ? "ممتاز. كل الاختبارات اجتازت — ثبّت الحل الآن." : "ما زال هناك خطأ صغير — راجع الاختبارات وحاول بتركيز.";
}
function useHint() { if (ui.hint.disabled || state.locked) return; state.hints += 1; ui.hint.disabled = true; ui.hint.textContent = current().hint; ui.hintText.textContent = `تلميح: ${current().hint}`; toast("تم فتح تلميح — سيُخصم 25 نقطة عند الحل"); }
function submitRound() { if (!state.testsPassed || state.locked || state.remaining <= 0) return; const bonus = Math.min(POINTS.maxTimeBonus, Math.floor(state.remaining / 3)), penalty = state.hints * POINTS.hint; finishRound({ solved: true, reason: "تم حل السؤال", timeBonus: bonus, hintPenalty: penalty, gained: Math.max(0, POINTS.correct + bonus - penalty) }); }
function finishUnsolved(reason) { if (state.locked) return; ui.console.className = "console fail"; ui.console.textContent = `$ ${reason}\n↳ لا توجد نقاط لهذا السؤال، لكن نموذج الحل سيظهر في النتيجة.`; finishRound({ solved: false, reason, timeBonus: 0, hintPenalty: 0, gained: 0 }); }
function finishRound(result) {
  if (state.locked) return; state.locked = true; stopTimer(); const item = current();
  if (result.solved) { state.score += result.gained; state.streak += 1; state.bestStreak = Math.max(state.bestStreak, state.streak); toast(`تم تثبيت ${item.file} — +${result.gained} نقطة`); } else { state.streak = 0; toast(`${result.reason} — ننتقل للسؤال التالي`); }
  state.rounds.push({ ...result, id: item.id, level: item.level, title: item.title, file: item.file, remaining: state.remaining, solution: item.solution, explanation: item.explanation }); ui.run.disabled = ui.submit.disabled = ui.hint.disabled = ui.skip.disabled = true; updateStats();
  setTimeout(() => { if (state.index === roundCount() - 1) showResults(); else { state.index += 1; state.remaining = ROUND_SECONDS; state.hints = 0; state.testsPassed = false; state.locked = false; ui.timerWrap.classList.remove("warning"); renderRound(); startTimer(); } }, 650);
}
function answerCard(round) { const detail = round.solved ? `+${POINTS.correct} حل +${round.timeBonus} وقت −${round.hintPenalty} تلميحات = <b class="points">${round.gained} نقطة</b>` : `<b class="points">0 نقطة</b> — ${safe(round.reason)}`; return `<details class="answer-card ${round.solved ? "solved" : "skipped"}"><summary><span><b>الجولة ${round.level}: ${safe(round.title)}</b><small> · ${safe(round.file)}</small></span><span class="status">${round.solved ? "محلول" : "متروك"} · ${detail}</span></summary><p><b>شرح الحل:</b> ${safe(round.explanation)}</p><pre><code>${safe(round.solution)}</code></pre></details>`; }
function board() { try { return JSON.parse(localStorage.getItem(BOARD_KEY) || "[]"); } catch { return []; } }
function saveBoard() { const entry = { player: state.player, score: state.score, solved: state.rounds.filter(row => row.solved).length, elapsed: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)), id: `${Date.now()}-${Math.random()}` }; const entries = [...board(), entry].sort((a, b) => b.score - a.score || a.elapsed - b.elapsed).slice(0, 12); try { localStorage.setItem(BOARD_KEY, JSON.stringify(entries)); } catch { /* Local result remains available */ } return { entries, rank: entries.findIndex(row => row.id === entry.id) }; }
function renderBoard(entries) { ui.leaderboard.innerHTML = entries.length ? entries.map((row, index) => `<div class="leader-row"><span>#${String(index + 1).padStart(2, "0")}</span><b>${safe(row.player)}</b><strong>${score(row.score)} نقطة · ${row.solved}/${roundCount()}</strong></div>`).join("") : "<p>بانتظار أول نتيجة.</p>"; }
function showResults() { stopTimer(); show(ui.results); const solved = state.rounds.filter(row => row.solved).length, count = roundCount(), remaining = state.rounds.reduce((sum, row) => sum + row.remaining, 0); ui.resultLanguage.textContent = state.language.toUpperCase(); ui.finalScore.textContent = score(state.score); ui.finalSolved.textContent = `${solved} / ${count}`; ui.finalStreak.textContent = `×${Math.max(1, state.bestStreak)}`; ui.finalTime.textContent = time(remaining); ui.resultMessage.textContent = solved === count ? "أتممت كل الأسئلة. راجع حلولك النموذجية أدناه." : `تم احتساب النتيجة رغم ترك ${count - solved} سؤال. نموذج الإجابات أدناه.`; ui.review.innerHTML = state.rounds.map(answerCard).join(""); const saved = saveBoard(); ui.finalRank.textContent = saved.rank >= 0 ? `#${saved.rank + 1} في الترتيب` : "نتيجتك جاهزة"; renderBoard(saved.entries); }
function reset() { stopTimer(); state.locked = false; show(ui.landing); }
function copyResult() { const text = `FIX ME — ${state.player}\nالنتيجة: ${state.score} نقطة\nالمحلول: ${state.rounds.filter(row => row.solved).length}/${roundCount()}`; navigator.clipboard?.writeText(text).then(() => toast("تم نسخ بطاقة النتيجة")).catch(() => toast(text)); }

document.querySelectorAll(".stack-card, .language-card").forEach(button => button.addEventListener("click", () => startGame(button.dataset.language)));
ui.run.addEventListener("click", runChecks); ui.hint.addEventListener("click", useHint); ui.submit.addEventListener("click", submitRound); ui.skip.addEventListener("click", () => finishUnsolved("تم تجاوز السؤال")); ui.reset.addEventListener("click", () => { ui.code.value = current().starter; updateLineNumbers(); state.testsPassed = false; ui.submit.disabled = true; ui.saveState.textContent = "UNSAVED"; }); ui.code.addEventListener("input", () => { updateLineNumbers(); state.testsPassed = false; ui.submit.disabled = true; ui.saveState.textContent = "EDITING"; }); $("exitGame").addEventListener("click", reset); $("playAgain").addEventListener("click", reset); $("copyResult").addEventListener("click", copyResult);
