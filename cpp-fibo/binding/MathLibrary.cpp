// MathLibrary.cpp : Defines the exported functions for the DLL.
#include "pch.h" // use stdafx.h in Visual Studio 2017 and earlier
#include <utility>
#include <limits.h>
#include "MathLibrary.h"
#include <unordered_map>
#include <string>
#include <algorithm>

struct _tState
{
    unsigned long long previous_;    // Previous value, if any
    unsigned long long current_;     // Current sequence value
    unsigned index_;                 // Current index position
};
// DLL internal state variables:
std::unordered_map<std::string, _tState> g_mapState;

_tState& getFiboState(const std::string guid)
{
    auto it = g_mapState.find(guid);
    if (it == g_mapState.end())
    {
        _tState state;
        state.previous_ = 0;
        state.current_ = 0;
        state.index_ = 0;
        g_mapState[guid] = state;
        return g_mapState[guid];
    }
    else
    {
        return it->second;
    }
}

// Initialize a Fibonacci relation sequence
// such that F(0) = a, F(1) = b.
// This function must be called before any other function.
void fibonacci_init(
    const char* guid,
    const unsigned long long a,
    const unsigned long long b)
{
    auto &state = getFiboState(guid);
    state.index_ = 0;
    state.current_ = a;
    state.previous_ = b; // see special case when initialized
}

// Produce the next value in the sequence.
// Returns true on success, false on overflow.
bool fibonacci_next(const char* guid)
{
    auto &state = getFiboState(guid);
    // check to see if we'd overflow result or position
    if ((ULLONG_MAX - state.previous_ < state.current_) ||
        (UINT_MAX == state.index_))
    {
        return false;
    }

    // Special case when index == 0, just return b value
    if (state.index_ > 0)
    {
        // otherwise, calculate next sequence value
        state.previous_ += state.current_;
    }
    std::swap(state.current_, state.previous_);
    ++(state.index_);
    return true;
}

// Get the current value in the sequence.
unsigned long long fibonacci_current(const char* guid)
{
    auto &state = getFiboState(guid);
    return state.current_;
}

// Get the current index position in the sequence.
unsigned fibonacci_index(const char* guid)
{
    auto &state = getFiboState(guid);
    return state.index_;
}