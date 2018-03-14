package main

func ensureIndex(mongoSession *mgo.Session) error {
	session := mongoSession.Copy()
	defer session.Close()

	c := session.DB("store").C("Users")

	index := mgo.Index{
		Key:        []int64{"ID"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
	err := c.EnsureIndex(index)
	if err != nil {
		return fmt.Errorf("mongo.go: ensureIndex(): error: %v", err)
	}
	return nil
}
