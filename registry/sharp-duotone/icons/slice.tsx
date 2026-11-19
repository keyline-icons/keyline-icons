import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Slice({ size = 24, ...props }: IconProps) {
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
      <path d="M16.8952 10.4114L11.0664 16.5293C10.8777 16.7274 10.616 16.8395 10.3424 16.8395C10.0856 16.8395 9.8386 16.7407 9.6526 16.5635L6.1567 13.2328C5.9586 13.0441 5.8465 12.7824 5.8465 12.5088C5.8465 12.252 5.9453 12.005 6.1225 11.819L12.1178 5.5263C13.7167 3.8481 15.4686 2.756 17.2488 2.2771C19.0376 1.7959 20.8212 1.9445 22.4255 2.6987C22.7761 2.8636 23 3.2162 23 3.6037C23 3.8605 22.9012 4.1075 22.724 4.2935Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.5251 16.3462L5.1267 15.0139C4.9408 14.8368 4.6938 14.7379 4.4369 14.7379C4.1633 14.7379 3.9017 14.85 3.7129 15.0481L1.809 17.0464C0.6923 18.2187 0.7371 20.0741 1.9093 21.1909C3.0815 22.3076 4.937 22.2629 6.0539 21.0905L7.9576 19.0923C8.1348 18.9064 8.2336 18.6594 8.2336 18.4025C8.2336 18.1289 8.1215 17.8673 7.9234 17.6785Z" fill="currentColor"/>
    </svg>
  )
}
