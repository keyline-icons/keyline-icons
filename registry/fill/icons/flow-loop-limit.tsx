import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowLoopLimit({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 20L5 20C2.7908 20 1 18.2092 1 16L1 10.8284C1 10.0328 1.3161 9.2697 1.8787 8.7071L5.7071 4.8787C6.2697 4.3161 7.0328 4 7.8284 4L16.1716 4C16.9672 4 17.7303 4.3161 18.2929 4.8787L22.1213 8.7071C22.6839 9.2697 23 10.0328 23 10.8284L23 16C23 18.2092 21.2092 20 19 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
