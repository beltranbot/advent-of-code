
def day24():
    L = []
    for line in get_input().split('\n'):
        L += [tuple([int(abc) for abc in line.split('/')])]
     = [[set(),0,0]]
    maxi = 0
    while queue:
        s,port,score = queue.pop(-1)
        if len(s) == 36:
            if score > maxi:
                maxi = score
        for a,b in L:
            if a == port and (a,b) not in s:
                queue.append([s | set([(a,b)]), b, score+a+b])
            if b == port and (a,b) not in s:
                queue.append([s | set([(a,b)]), a, score+a+b])
    print(maxi)