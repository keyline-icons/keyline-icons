import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TerminalCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M13.768 3.77343C14.9252 3.40124 16.0243 4.4913 15.6557 5.65429L15.6538 5.66112L12.5298 15.2891C12.1127 16.5849 10.3211 16.6994 9.74362 15.4639L7.78855 11.2832L3.91745 9.64257L3.91843 9.64159C2.6436 9.10607 2.71087 7.27571 4.0239 6.83691C4.02945 6.83506 4.0359 6.83377 4.04148 6.83202L13.768 3.77343Z" fill="currentColor" stroke="none"/>
      <path d="M21 19H12" strokeOpacity="0.4"/>
    </svg>
  )
}
