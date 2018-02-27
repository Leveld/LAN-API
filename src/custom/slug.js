import slug from 'remark-slug';
import BananaSlug from 'github-slugger';

if (!BananaSlug.prototype.changed === true) {
  BananaSlug.prototype.originalSlug = BananaSlug.prototype.slug;
  BananaSlug.prototype.slug = function (value, maintainCase, incrementDuplicates = false) {
    const slug = this.originalSlug(value, maintainCase);
    if (!incrementDuplicates)
      this.reset();
    return slug;
  }
} else {
  BananaSlug.prototype.changed = true;
}

export default (...args) => {
  const slugTransformer = slug();

  function transformer(ast) {
    if (typeof ast === 'string') {

      return;
    }
    slugTransformer(ast);
    const idPath = [];
    for (let child of ast.children) {
      // console.log(JSON.stringify(child))
      if (child.type === 'heading' && child.data && typeof child.data.id === 'string' && child.depth < 4) {
        idPath.length = child.depth;
        idPath[child.depth - 1] = child.data.id;
        child.data.id = idPath.join('-');
        child.data.hProperties.id = child.data.id;
      }
    }
  }

  return transformer;
};
