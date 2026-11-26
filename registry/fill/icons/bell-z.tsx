import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BellZ({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 2C10.6254 2 11.2303 2.0961 11.7996 2.2748C12.2166 2.4059 12.5 2.7922 12.5 3.2289L12.5 10C12.5 11.6569 13.8431 13 15.5 13L16.5729 13C16.9196 13 17.2416 13.1796 17.4238 13.4746C17.5426 13.667 17.6817 13.8927 17.7864 14.1174C17.8946 14.3497 18 14.6492 18 15C18 16.1046 17.1046 17 16 17L4 17C2.8954 17 2 16.1046 2 15C2 14.4387 2.2784 13.9674 2.455 13.673C2.6689 13.3166 2.8785 13.007 3.1056 12.5528C3.5331 11.6977 4 10.3517 4 8C4 4.6863 6.6863 2 10 2Z" fill="currentColor" stroke="none"/>
      <path d="M8.2679 20C8.6252 20.6188 9.2855 21 10 21C10.7145 21 11.3748 20.6188 11.7321 20M21 10H16.1466C15.71 10 15.4831 9.4797 15.7802 9.15977L20.7198 3.84023C21.0169 3.5203 20.79 3 20.3534 3H15.5"/>
    </svg>
  )
}
