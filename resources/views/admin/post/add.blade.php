@extends('layouts.admin') @section('admin-page')
<form class="form-horizontal" method="post">
	<div class="row">
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_title">Название</label>
			<input type="text" name="title" placeholder="Синий экзорцист" id="input_title" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_alt_name">Название (url)</label>
			<input type="text" name="alt_name" placeholder="ao-no-exorcist" id="input_alt_name" class="form-control" readonly>
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_keywords">Ключевые слова</label>
			<input type="text" name="keywords" placeholder="Синий, сатана, экзорцист" id="input_keywords" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_trailer">Трейлер</label>
			<input type="text" name="trailer" placeholder="https://www.youtube.com/embed/ktvTqknDobU" id="input_trailer" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_poster">Постер</label>
			<input type="text" name="poster" placeholder="https://pp.vk.me/c626916/v626916646/3c876/YnmIucACXCw.jpg" id="input_poster"
			 class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_poster_author">Автор постера</label>
			<input type="text" name="poster_author" placeholder="Demitra" id="input_poster_author" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_voicers">Озвучка</label>
			<input type="text" name="voicers" placeholder="TokiSeven, Fretta" id="input_voicers" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_translaters">Перевод</label>
			<input type="text" name="translaters" placeholder="Alliance - fandub" id="input_translaters" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_timer">Таймер</label>
			<input type="text" name="timer" placeholder="CaliBri" id="input_timer" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-12 ">
			<label for="input_hashtags">Хештеги (для поиска: добавляйте года, различную полезную инфу)</label>
			<input type="text" name="hashtags" placeholder="2017,Кисимото Атускирович,ololo,vk" id="input_hashtags" class="form-control">
		</div>
		<div class="form-group col-xs-12 col-sm-12">
			<label for="input_full_story">Полное описание</label>
			<textarea name="full_story" placeholder="Полное описание" id="input_full_story" class="form-control" rows="5"></textarea>
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_categories">Категории</label>
			<input type="text" name="categories" placeholder="1,2,3" id="input_categories" class="form-control" readonly>
		</div>
		<div class="form-group col-xs-12 col-sm-4">
			<label for="input_full_story">Выберите категории</label>
			<ul id="categories_container" class="list-unstyled"></ul>
		</div>
		<div class="form-group col-xs-12 col-sm-12">
			<button type="submit" class="btn btn-primary btn-block">Добавить</button>
		</div>
	</div>
</form>

<script>
	$('#input_title').keyup(function() {
        var value = $(this).val();
        value = value.replace(/ /g, '-')
            .replace(/[^a-zA-Z0-9\-]/g, "")
            .replace(/-{2,}/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase();
        $('#input_alt_name').val(value);
    });

    $('#input_hashtags').keyup(function() {
        var value = $(this).val();
        value = value
            .replace(/[^a-zA-Z0-9а-яА-Я,_\-]/g, "")
            .replace(/-{2,}/g, '-')
            .replace(/_{2,}/g, '_')
            .replace(/,{2,}/g, ',');
        $(this).val(value);
    });

    $('#input_hashtags').change(function() {
        var value = $(this).val();
        var charF = value.charAt(0);
        var charL = value.charAt(value.length);
        do {
            value = value.replace(/^-|-$/g, '')
                .replace(/^_|_$/g, '')
                .replace(/^,|,$/g, '');
            charF = value.charAt(0);
            charL = value.charAt(value.length);
        } while (charF == ',' || charF == '_' || charF == '-' || charL == ',' || charL == '_' || charL == '-');
        $(this).val(value);
    });

</script>
@endsection