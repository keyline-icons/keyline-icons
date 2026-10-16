import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BrainCircuit({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 4.75C13 2.6789 11.3211 1 9.25 1C8.0231 1 6.8737 1.6002 6.1726 2.6071C4.745 2.9829 3.75 4.2737 3.75 5.75C3.75 5.9009 3.7605 6.0516 3.7814 6.201C2.7785 6.7663 2.1177 7.7887 2.0142 8.9353C1.3626 9.6303 1 10.5473 1 11.5C1 12.0626 1.1266 12.618 1.3704 13.125C1.1266 13.632 1 14.1874 1 14.75C1 16.1412 1.7701 17.418 3.0006 18.067C3.0245 19.3129 3.709 20.4522 4.7979 21.0583C5.6382 22.2742 7.022 23 8.5 23C10.9853 23 13 20.9853 13 18.5L13 4.75ZM9.7888 12.5826L9.7491 13.5413C9.6849 15.0972 9.0514 16.5754 7.969 17.6951L7.6742 18L6.2362 16.6099L6.531 16.3049C7.2727 15.5378 7.7068 14.5249 7.7509 13.4587L7.7905 12.5L9.7888 12.5826Z" fill="currentColor" stroke="none"/>
      <path d="M12 7.5L21.5 7.5M12 12L18.5 12M12 16.5L21.5 16.5" fill="none"/>
      <path d="M23 7.5C23 8.3284 22.3284 9 21.5 9C20.6716 9 20 8.3284 20 7.5C20 6.6716 20.6716 6 21.5 6C22.3284 6 23 6.6716 23 7.5ZM20 12C20 12.8284 19.3284 13.5 18.5 13.5C17.6716 13.5 17 12.8284 17 12C17 11.1716 17.6716 10.5 18.5 10.5C19.3284 10.5 20 11.1716 20 12ZM23 16.5C23 17.3284 22.3284 18 21.5 18C20.6716 18 20 17.3284 20 16.5C20 15.6716 20.6716 15 21.5 15C22.3284 15 23 15.6716 23 16.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
