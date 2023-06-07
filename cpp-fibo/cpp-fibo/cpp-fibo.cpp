// cpp-fibo.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <Windows.h>
#include <iostream>

typedef VOID(CALLBACK* LPFNFiboInit)(const char*, ULONGLONG, ULONGLONG);
LPFNFiboInit FiboInit;
typedef bool(CALLBACK* LPFNFiboNext)(const char*);
LPFNFiboNext FiboNext;
typedef ULONGLONG(CALLBACK* LPFNFiboCurr)(const char*);
LPFNFiboCurr FiboCurr;

int main()
{
    HMODULE mod = LoadLibrary(L"binding.dll");
    if (nullptr == mod)
    {
        std::cout << "LoadLibrary failed" << std::endl;
        return 1;
    }

    FiboInit = (LPFNFiboInit)GetProcAddress(mod, "fibonacci_init");
    if (nullptr == FiboInit)
    {
        FreeLibrary(mod);
        std::cout << "fibonacci_init GetProcAddress failed" << std::endl;
        return 1;
    }

    FiboNext = (LPFNFiboNext)GetProcAddress(mod, "fibonacci_next");
    if (nullptr == FiboNext)
    {
        FreeLibrary(mod);
        std::cout << "fibonacci_next GetProcAddress failed" << std::endl;
        return 1;
    }

    FiboCurr = (LPFNFiboCurr)GetProcAddress(mod, "fibonacci_current");
    if (nullptr == FiboCurr)
    {
        FreeLibrary(mod);
        std::cout << "fibonacci_current GetProcAddress failed" << std::endl;
        return 1;
    }

    FiboInit("1", 0, 1);
    std::cout << "FiboCurr: " << FiboCurr("1") << std::endl;
    // print next 10 numbers
    for (int i = 0; i < 10; i++)
    {
        if (true == FiboNext("1"))
            std::cout << "FiboCurr: " << FiboCurr("1") << std::endl;
        else
            break;
    }

    FiboInit("2", 1, 1);
    std::cout << "FiboCurr: " << FiboCurr("2") << std::endl;
    // print next 10 numbers
    for (int i = 0; i < 10; i++)
    {
        if (true == FiboNext("2"))
            std::cout << "FiboCurr: " << FiboCurr("2") << std::endl;
        else
            break;
    }

    return 0;
}
