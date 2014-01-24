require([
		"util",
		"render",
		"entitys/levelEntity"
	], function (util, RenderManager, LevelEntity) {
	var renderManager = new RenderManager();
	var canvas = document.querySelector("#gameCanvas");
	util.assert(canvas);
	renderManager.bindTo(canvas);
	renderManager.setSize();
	renderManager.addEntity(new LevelEntity());
	renderManager.start(function (dt, renderer) {
		renderManager.renderAll(renderer);
	});
});