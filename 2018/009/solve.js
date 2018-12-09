function mod(n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
}

function solve1() {
  const n_players = 438
  const last_marble = 7162600

  function rev (node, n) {
    for (let i = 0; i < n; i++) {
      node = node.prev
    }
    return node
  }

  function deleteNode(n) {
    n.next.prev = n.prev
    n.prev.next = n.next
  }

  function insertAfter(n, m) {
    m.next = n.next
    m.prev = n
    m.prev.next = m
    m.next.prev = m
  }

  let node = {value: 0}
  node['prev'] = node
  node['next'] = node

  let cur = node
  
  let players = []
  for (let i = 0; i < n_players; i++) {
    players.push(0)
  }

  for (let i = 1; i <= last_marble; i++) {
    let new_node = {value: i}

    if (i % 23 === 0) {
      let player = (i % players.length)
      players[player] += i
      cur = rev(cur, 6)
      players[player] += cur.prev.value
      deleteNode(cur.prev)
      continue
    }

    insertAfter(cur.next, new_node)
    cur = new_node

  }

  return players.reduce((a, c) => c > a ? c : a, -Infinity)
}

module.exports = {
  solve1, solve2
}