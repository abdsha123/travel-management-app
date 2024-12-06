#ifndef AVLTREE_HPP
#define AVLTREE_HPP

#include <algorithm>
#include <iostream>
#include <optional>
#include <cmath>
#include <limits>

using namespace std;

// Seat struct to define seat attributes
struct Seat {
    int seatID;
    bool isAvailable; // Availability status of the seat
    string seatType;  // Type of seat (e.g., "Regular", "VIP")

    Seat(int id, bool available = true, string type = "Regular")
        : seatID(id), isAvailable(available), seatType(type) {}
};

// Overload comparison operators for Seat, based on seatID
bool operator<(const Seat& s1, const Seat& s2) { return s1.seatID < s2.seatID; }
bool operator>(const Seat& s1, const Seat& s2) { return s1.seatID > s2.seatID; }

// Template class representing a node in the AVL tree
template <typename T>
class AVLNode {
public:
    T data;
    AVLNode* left;
    AVLNode* right;
    int height;

    AVLNode(T value)
        : data(value), left(nullptr), right(nullptr), height(1) {}
};

// Template class representing the AVL tree for seat management
template <typename T>
class AVLTree {
private:
    AVLNode<T>* root;

    int height(AVLNode<T>* node) { return node ? node->height : 0; }
    int balanceFactor(AVLNode<T>* node) { return height(node->left) - height(node->right); }

    AVLNode<T>* rightRotate(AVLNode<T>* y) {
        AVLNode<T>* x = y->left;
        AVLNode<T>* T2 = x->right;
        x->right = y;
        y->left = T2;
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;
        return x;
    }

    AVLNode<T>* leftRotate(AVLNode<T>* x) {
        AVLNode<T>* y = x->right;
        AVLNode<T>* T2 = y->left;
        y->left = x;
        x->right = T2;
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;
        return y;
    }

    AVLNode<T>* insert(AVLNode<T>* node, T data) {
        if (!node) return new AVLNode<T>(data);
        if (data < node->data)
            node->left = insert(node->left, data);
        else if (data > node->data)
            node->right = insert(node->right, data);
        else {
            // Seat already exists
            cerr << "Seat already exists\n";
            return node;
        }

        node->height = 1 + max(height(node->left), height(node->right));
        int balance = balanceFactor(node);

        if (balance > 1 && data < node->left->data) return rightRotate(node);
        if (balance < -1 && data > node->right->data) return leftRotate(node);
        if (balance > 1 && data > node->left->data) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        if (balance < -1 && data < node->right->data) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
        return node;
    }

    AVLNode<T>* deleteNode(AVLNode<T>* root, T data) {
        if (!root) return root;
        if (data < root->data)
            root->left = deleteNode(root->left, data);
        else if (data > root->data)
            root->right = deleteNode(root->right, data);
        else {
            if (!root->left || !root->right) {
                AVLNode<T>* temp = root->left ? root->left : root->right;
                if (!temp) {
                    temp = root;
                    root = nullptr;
                } else
                    *root = *temp;
                delete temp;
            } else {
                AVLNode<T>* temp = minValueNode(root->right);
                root->data = temp->data;
                root->right = deleteNode(root->right, temp->data);
            }
        }
        if (!root) return root;
        root->height = 1 + max(height(root->left), height(root->right));
        int balance = balanceFactor(root);

        if (balance > 1 && balanceFactor(root->left) >= 0) return rightRotate(root);
        if (balance > 1 && balanceFactor(root->left) < 0) {
            root->left = leftRotate(root->left);
            return rightRotate(root);
        }
        if (balance < -1 && balanceFactor(root->right) <= 0) return leftRotate(root);
        if (balance < -1 && balanceFactor(root->right) > 0) {
            root->right = rightRotate(root->right);
            return leftRotate(root);
        }
        return root;
    }

    void inorder(AVLNode<T>* root) {
        if (root) {
            inorder(root->left);
            cout << "SeatID: " << root->data.seatID << ", Available: " << root->data.isAvailable << ", Type: " << root->data.seatType << endl;
            inorder(root->right);
        }
    }

    bool search(AVLNode<T>* node, int seatID) const {
        if (!node) return false;

        if (node->data.seatID == seatID) return true;
        if (seatID < node->data.seatID)
            return search(node->left, seatID);
        return search(node->right, seatID);
    }

public:
    AVLTree() : root(nullptr) {}

    void insert(T data) { root = insert(root, data); }
    void remove(T data) { root = deleteNode(root, data); }
    void printInorder() { inorder(root); }

    bool search(int seatID) const {
        return search(root, seatID);
    }

    bool bookSeat(int seatID) {
        return toggleAvailability(root, seatID, false);
    }
    bool cancelSeat(int seatID) {
        return toggleAvailability(root, seatID, true);
    }

    std::optional<Seat> findNearestAvailableSeat(int targetSeatID) {
        std::optional<Seat> closest;
        return findNearestAvailable(root, targetSeatID, closest);
    }

private:
    AVLNode<T>* minValueNode(AVLNode<T>* node) {
        AVLNode<T>* current = node;
        while (current->left) current = current->left;
        return current;
    }

    bool toggleAvailability(AVLNode<T>* node, int seatID, bool newAvailability) {
        if (!node) return false;

        if (seatID == node->data.seatID) {
            if (node->data.isAvailable != newAvailability) {
                node->data.isAvailable = newAvailability;
                return true;
            }
            return false;
        } else if (seatID < node->data.seatID) {
            return toggleAvailability(node->left, seatID, newAvailability);
        } else {
            return toggleAvailability(node->right, seatID, newAvailability);
        }
    }

    std::optional<Seat> findNearestAvailable(AVLNode<T>* node, int targetSeatID, std::optional<Seat>& closest) {
        if (!node) return closest;

        int currentDistance = abs(node->data.seatID - targetSeatID);
        int closestDistance = closest ? abs(closest->seatID - targetSeatID) : numeric_limits<int>::max();

        if (node->data.isAvailable && (!closest || currentDistance < closestDistance ||
                                       (currentDistance == closestDistance && node->data.seatID < closest->seatID))) {
            closest = node->data;
        }

        if (targetSeatID < node->data.seatID) {
            findNearestAvailable(node->left, targetSeatID, closest);
        } else {
            findNearestAvailable(node->right, targetSeatID, closest);
        }

        return closest;
    }
};

#endif // AVLTREE_HPP
