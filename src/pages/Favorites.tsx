const Favorites = () => {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your Favorites
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Products you've saved for later.
        </p>
      </header>
      <div className="text-center text-muted-foreground">
        <p>You haven't favorited any items yet.</p>
      </div>
    </div>
  );
};

export default Favorites;