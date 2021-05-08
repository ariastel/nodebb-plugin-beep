<div class="beep settings" class="row">
	<div class="col-xs-12">
		<form role="form" class="beep-settings">
			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Запрещенные слова</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="form-group">
							<label for="illegal"><i>через запятую</i> список запрещенных слов (пост не будет разрешен)</label>
							<textarea class="form-control" id="illegal" name="illegal" placeholder="eg. anal, anus, arse, ass, ballsack"></textarea>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Запрещенные слова</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="form-group">
							<label for="id"><i>через запятую</i> список запрещенных слов (пост будет подвергнут цензуре со звездочками)</label>
							<textarea class="form-control" id="id" name="id" placeholder="eg. anal, anus, arse, ass, ballsack">anal, anus, arse, ass, ballsack, balls, bastard, bitch, biatch, bloody, blowjob, blow job, bollock, bollok, boner, boob, bugger, bum, butt, buttplug, clitoris, cock, coon, crap, cunt, damn, dick, dildo, dyke, fag, feck, fellate, fellatio, felching, fuck, f u c k, fudgepacker, fudge packer, flange, homo, jerk, jizz, knobend, knob end, labia, muff, nigger, nigga, penis, piss, poop, prick, pube, pussy, queer, sex, shit, s hit, sh1t, slut, smegma, spunk, tit, tosser, turd, twat, vagina, wank, whore</textarea>
						</div>
					</fieldset>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Запрещенные URLs</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>

						<div class="form-group">
							<label for="urls"><i>через запятую</i> список запрещенных URL-адресов (ссылка будет отображаться как [недопустимая ссылка])</label>
							<textarea class="form-control" id="urls" name="urls" placeholder="eg. google.com, yahoo.com"></textarea>
						</div>

					</fieldset>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2 col-xs-12 settings-header">Настройки цензуры</div>
				<div class="col-sm-10 col-xs-12">
					<fieldset>
						<div class="checkbox">
							<label>
								<input type="checkbox" name="censorWholeWord">
								Цензурить все слово (слово полностью скрыто)
							</label>
						</div>
					</fieldset>
				</div>
			</div>

		</form>
	</div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('beep', $('.beep-settings'));

		$('#save').on('click', function() {
			Settings.save('beep', $('.beep-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'beep-saved',
					title: 'Успех',
					message: 'Настройки были успешно сохранены'
				});
			});
		});
	});
</script>
