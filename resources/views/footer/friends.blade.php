<div class = "row">
    @foreach(\App\FriendsBlock::with('data')->get() as $friendsBlock)
        <div class = "col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 block">
            <div class = "row">
                <div class = "col">
                    <h4>
                        {{ $friendsBlock->title }}
                    </h4>
                </div>
            </div>
            <div class = "row block-data">
                @foreach($friendsBlock->data as $friend)
                    <div class = "col-xs-12 col-sm-12">
                        <a target = "_blank" href="{{ $friend->uri }}" title="{{ $friend->title }}" class = "friend">{{ $friend->title }}</a>
                    </div>
                @endforeach
            </div>
        </div>
    @endforeach
</div>