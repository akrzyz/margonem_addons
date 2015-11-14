var __newOther__ = newOther
newOther = function(a)
{
    __newOther__(a);
    for (k in a)
    {
        $("#other"+k).rightClick(function()
        {
            var id = this.id.substr(5);
            chatTo(g.other[id].nick)    
        });
    }
}