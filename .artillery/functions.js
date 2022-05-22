let usernames = ["krteazy", "hutafter"];

function returnRandomTwitterUsername(requestParams, ctx, ee, next) {
  let username = usernames[Math.floor(Math.random() * usernames.length)];

  ctx.vars["user"] = username;
  ctx.vars["color"] = "bg-blue-200";
  ctx.vars["message"] = "Atirando...";

  return next();
}

module.exports = {
  returnRandomTwitterUsername,
};
