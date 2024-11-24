# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.30

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = "/mnt/sdb1/lancers/travel management app/cpp"

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = "/mnt/sdb1/lancers/travel management app/cpp/build"

# Include any dependencies generated for this target.
include CMakeFiles/ticket_booking.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/ticket_booking.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/ticket_booking.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/ticket_booking.dir/flags.make

CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o: CMakeFiles/ticket_booking.dir/flags.make
CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o: /mnt/sdb1/lancers/travel\ management\ app/cpp/src/ticket_booking.cpp
CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o: CMakeFiles/ticket_booking.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir="/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o -MF CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o.d -o CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o -c "/mnt/sdb1/lancers/travel management app/cpp/src/ticket_booking.cpp"

CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E "/mnt/sdb1/lancers/travel management app/cpp/src/ticket_booking.cpp" > CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.i

CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S "/mnt/sdb1/lancers/travel management app/cpp/src/ticket_booking.cpp" -o CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.s

# Object files for target ticket_booking
ticket_booking_OBJECTS = \
"CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o"

# External object files for target ticket_booking
ticket_booking_EXTERNAL_OBJECTS =

libticket_booking.so: CMakeFiles/ticket_booking.dir/src/ticket_booking.cpp.o
libticket_booking.so: CMakeFiles/ticket_booking.dir/build.make
libticket_booking.so: CMakeFiles/ticket_booking.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir="/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles" --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX shared library libticket_booking.so"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/ticket_booking.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/ticket_booking.dir/build: libticket_booking.so
.PHONY : CMakeFiles/ticket_booking.dir/build

CMakeFiles/ticket_booking.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/ticket_booking.dir/cmake_clean.cmake
.PHONY : CMakeFiles/ticket_booking.dir/clean

CMakeFiles/ticket_booking.dir/depend:
	cd "/mnt/sdb1/lancers/travel management app/cpp/build" && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" "/mnt/sdb1/lancers/travel management app/cpp" "/mnt/sdb1/lancers/travel management app/cpp" "/mnt/sdb1/lancers/travel management app/cpp/build" "/mnt/sdb1/lancers/travel management app/cpp/build" "/mnt/sdb1/lancers/travel management app/cpp/build/CMakeFiles/ticket_booking.dir/DependInfo.cmake" "--color=$(COLOR)"
.PHONY : CMakeFiles/ticket_booking.dir/depend

